import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
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
}

export function LaigaEquipmentUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const processCSV = (file: File): Promise<Equipment[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
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

      if (fileExtension === 'csv') {
        equipmentData = await processCSV(file);
      } else {
        equipmentData = await processExcel(file);
      }

      // Normalize field names and prepare data for database
      const normalizedData = equipmentData.map(item => ({
        name: item.name || item['Nome'] || item['NOME'] || '',
        description: item.description || item['Descrição'] || item['DESCRIÇÃO'] || item['Descricao'] || null,
        model: item.model || item['Modelo'] || item['MODELO'] || null,
        brand: item.brand || item['Marca'] || item['MARCA'] || null,
        serial_number: item.serial_number || item['Número de Série'] || item['NUMERO_SERIE'] || item['Serial'] || null,
        status: item.status || item['Status'] || item['STATUS'] || 'available',
        location: item.location || item['Localização'] || item['LOCALIZACAO'] || item['Local'] || null,
        responsible_person: item.responsible_person || item['Responsável'] || item['RESPONSAVEL'] || item['Responsavel'] || null,
        acquisition_date: item.acquisition_date || item['Data de Aquisição'] || item['DATA_AQUISICAO'] || null,
        last_maintenance: item.last_maintenance || item['Última Manutenção'] || item['ULTIMA_MANUTENCAO'] || null,
        next_maintenance: item.next_maintenance || item['Próxima Manutenção'] || item['PROXIMA_MANUTENCAO'] || null,
        observations: item.observations || item['Observações'] || item['OBSERVACOES'] || item['Obs'] || null
      })).filter(item => item.name); // Remove items without name

      if (normalizedData.length === 0) {
        toast({
          title: 'Nenhum equipamento válido encontrado',
          description: 'Verifique se o arquivo contém dados válidos com pelo menos o campo "nome".',
          variant: 'destructive',
        });
        return;
      }

      // Insert data into Supabase
      const { error } = await supabase
        .from('laiga_equipments')
        .insert(normalizedData);

      if (error) {
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
        description: 'Ocorreu um erro ao processar o arquivo. Verifique o formato e tente novamente.',
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