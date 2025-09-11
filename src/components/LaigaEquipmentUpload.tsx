import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Upload, FileSpreadsheet } from 'lucide-react';

interface Equipment {
  name: string;
  description?: string;
  model?: string;
  brand?: string;
  serial_number?: string;
  status?: string;
  location?: string;
  responsible_person?: string;
  acquisition_date?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  observations?: string;
  created_at?: string; // allow overriding created_at when provided
}

export function LaigaEquipmentUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Normalize header/keys: remove BOM, trim, lowercase, remove accents and non-alphanumerics
  const normalizeKey = (str: string | null | undefined) => {
    if (!str) return '';
    return str
      .replace(/^\uFEFF/, '') // BOM
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  const normalizeValue = (val: unknown) => {
    if (typeof val === 'string') return val.trim();
    return val;
  };

  // Convert date strings like 25/03/2024, 03/04/24, 2024/03/19 2:20:06 to ISO formats
  const parseDateLike = (value: any): string | null => {
    if (value == null) return null;
    const str = String(value).trim();
    if (!str) return null;

    // Split date and time
    const [datePart, timePartRaw] = str.split(/[ T]/);

    // Identify separator
    const sep = datePart.includes('/') ? '/' : (datePart.includes('-') ? '-' : null);
    if (!sep) return null;

    const parts = datePart.split(sep).map(p => p.padStart(2, '0'));

    let year: number, month: number, day: number;
    if (parts[0].length === 4) {
      // YYYY/MM/DD
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else {
      // DD/MM/YYYY or DD/MM/YY
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const yy = parseInt(parts[2], 10);
      year = parts[2].length === 2 ? (yy <= 50 ? 2000 + yy : 1900 + yy) : yy;
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateISO = `${year}-${pad(month)}-${pad(day)}`;

    if (timePartRaw) {
      const tParts = timePartRaw.split(':');
      const hh = pad(parseInt(tParts[0] || '0', 10));
      const mm = pad(parseInt(tParts[1] || '0', 10));
      const ss = pad(parseInt(tParts[2] || '0', 10));
      return `${dateISO} ${hh}:${mm}:${ss}`;
    }

    return dateISO;
  };
  const processCSV = (file: File): Promise<Equipment[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: 'greedy',
        dynamicTyping: false,
        encoding: 'utf-8',
        transformHeader: (header: string) => normalizeKey(header),
        transform: (value: any) => normalizeValue(value),
        complete: (results) => {
          resolve(results.data as Equipment[]);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  const processExcel = (file: File): Promise<Equipment[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });
          const normalized = jsonData.map((row) => {
            const out: Record<string, any> = {};
            Object.entries(row).forEach(([k, v]) => {
              out[normalizeKey(k)] = normalizeValue(v);
            });
            return out as Equipment;
          });
          resolve(normalized);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, 'Type:', file.type, 'Size:', file.size);

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!['csv', 'xls', 'xlsx'].includes(fileExtension || '')) {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, selecione um arquivo CSV, XLS ou XLSX.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      let equipmentData: Equipment[];

      console.log('Processing file with extension:', fileExtension);

      if (fileExtension === 'csv') {
        equipmentData = await processCSV(file);
      } else {
        equipmentData = await processExcel(file);
      }

      console.log('Raw data from file:', equipmentData);

      // Normalize field names and prepare data for database
      const normalizedData = equipmentData.map(item => {
        // Create a case-insensitive key mapper
        const keys = Object.keys(item);
        const findKey = (patterns: string[]) => {
          for (const pattern of patterns) {
            const found = keys.find(key => 
              key.toLowerCase().includes(pattern.toLowerCase()) ||
              pattern.toLowerCase().includes(key.toLowerCase())
            );
            if (found) return item[found as keyof typeof item];
          }
          return null;
        };

        const normalized = {
          name: findKey([
            'name', 'nome', 'item', 'produto', 'product',
            'denominação', 'denominacao', 'título', 'titulo', 'descritor'
          ]) || '',
          description: findKey([
            'description', 'descrição', 'descricao', 'desc', 'detalhes', 'details',
            'especificação', 'especificacao', 'specs', 'características', 'caracteristicas', 'uso'
          ]),
          model: findKey([
            'model', 'modelo', 'mod', 'version', 'versão', 'versao', 'tipo', 'type', 'equipamento', 'equip'
          ]),
          brand: findKey([
            'brand', 'marca', 'fabricante', 'manufacturer', 'make', 'empresa', 'company'
          ]),
          serial_number: findKey([
            'serial_number', 'serial', 'série', 'serie', 'numero_serie', 'número_série',
            'número de série', 'numero de serie', 'sn', 's/n', 'number', 'numero'
          ]),
          status: findKey([
            'status', 'estado', 'situação', 'situacao', 'condition', 'condição', 'condicao',
            'disponibilidade', 'availability', 'ativo', 'active'
          ]) || 'available',
          location: findKey([
            'location', 'localização', 'localizacao', 'local', 'lugar', 'place',
            'sala', 'room', 'setor', 'sector', 'área', 'area'
          ]),
          responsible_person: findKey([
            'responsible_person', 'responsável', 'responsavel', 'responsible', 
            'encarregado', 'supervisor', 'operador', 'operator', 'técnico', 'tecnico',
            'usuario', 'usuário', 'user', 'email'
          ]),
          acquisition_date: findKey([
            'acquisition_date', 'data_aquisição', 'data_aquisicao', 'data de aquisição',
            'data de aquisicao', 'compra', 'purchase', 'bought', 'adquirido', 'acquired',
            'início', 'inicio', 'data_inicio'
          ]),
          last_maintenance: findKey([
            'last_maintenance', 'última_manutenção', 'ultima_manutencao', 'última manutenção',
            'ultima manutencao', 'manutenção', 'manutencao', 'maintenance', 'revisão', 'revisao'
          ]),
          next_maintenance: findKey([
            'next_maintenance', 'próxima_manutenção', 'proxima_manutencao', 'próxima manutenção',
            'proxima manutencao', 'next', 'próximo', 'proximo', 'future', 'futuro',
            'término', 'termino', 'data_termino', 'fim', 'final'
          ]),
          observations: findKey([
            'observations', 'observações', 'observacoes', 'obs', 'notas', 'notes',
            'comentários', 'comentarios', 'comments', 'remarks', 'anotações', 'anotacoes'
          ]),
          created_at: findKey([
            'solicitação', 'solicitacao', 'solicitacao', 'data_solicitação', 'data_solicitacao', 'request', 'solicitacao'
          ])
        } as any;
        
        // Ajustar datas para ISO antes de inserir
        const fixDate = (v: any) => (typeof v === 'string' ? (parseDateLike(v) ?? v) : v);
        normalized.acquisition_date = fixDate(normalized.acquisition_date);
        normalized.last_maintenance = fixDate(normalized.last_maintenance);
        normalized.next_maintenance = fixDate(normalized.next_maintenance);
        if (normalized.created_at) {
          const parsed = parseDateLike(normalized.created_at);
          if (parsed) normalized.created_at = parsed;
          else delete normalized.created_at;
        }
        
        console.log('Original item keys:', keys);
        console.log('Original item:', item);
        console.log('Normalized:', normalized);
        return normalized;
      }).filter(item => item.name && item.name.toString().trim() !== ''); // Remove items without valid name

      console.log('Normalized data:', normalizedData);

      if (normalizedData.length === 0) {
        const sampleKeys = equipmentData[0] ? Object.keys(equipmentData[0]) : [];
        toast({
          title: 'Nenhum equipamento válido encontrado',
          description: `Verifique se o arquivo contém dados válidos. Colunas encontradas: ${sampleKeys.join(', ')}. Certifique-se de que existe uma coluna com nome do equipamento.`,
          variant: 'destructive',
        });
        return;
      }

      // Insert data into Supabase
      const { error } = await supabase
        .from('laiga_equipments')
        .insert(normalizedData);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: 'Upload realizado com sucesso!',
        description: `${normalizedData.length} equipamento(s) foram adicionados ao sistema.`,
      });

      // Clear the input
      event.target.value = '';

    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Erro no upload',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao processar o arquivo. Verifique o formato e tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Upload de Equipamentos LAIGA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Formatos aceitos: CSV, XLS, XLSX</p>
          <p className="mt-2">
            <strong>Campos reconhecidos:</strong> Nome, Email, Equipamento, Uso, Início, Término, Solicitação. Além disso: 
            Descrição, Modelo, Marca, Número de Série, Status, Localização, Responsável, Data de Aquisição, 
            Última Manutenção, Próxima Manutenção, Observações
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="flex-1"
          />
          <Button disabled={isUploading} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Carregando...' : 'Selecionar Arquivo'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}