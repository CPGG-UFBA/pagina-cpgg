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
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as Equipment[];
          resolve(jsonData);
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
          ])
        };
        
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
            <strong>Campos esperados:</strong> Nome (obrigatório), Descrição, Modelo, Marca, 
            Número de Série, Status, Localização, Responsável, Data de Aquisição, 
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