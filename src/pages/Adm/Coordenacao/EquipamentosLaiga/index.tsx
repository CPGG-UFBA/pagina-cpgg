import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LaigaEquipmentUpload } from '@/components/LaigaEquipmentUpload';
import styles from './equipamentos.module.css';
import logoUfba from '/src/components/Figures/LogoUfba.png';
import { Trash2, Search, LogOut } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  description?: string;
  model?: string;
  brand?: string;
  serial_number?: string;
  status: string;
  location?: string;
  responsible_person?: string;
  acquisition_date?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  observations?: string;
  created_at: string;
}

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

export function EquipamentosLaiga() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (adminData) {
      setAdminUser(JSON.parse(adminData));
    }
    fetchEquipments();
  }, []);

  useEffect(() => {
    filterEquipments();
  }, [equipments, searchTerm, statusFilter]);

  const fetchEquipments = async () => {
    try {
      const { data, error } = await supabase
        .from('laiga_equipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEquipments(data || []);
    } catch (error) {
      console.error('Error fetching equipments:', error);
      toast({
        title: 'Erro ao carregar equipamentos',
        description: 'Não foi possível carregar a lista de equipamentos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEquipments = () => {
    let filtered = equipments;

    if (searchTerm) {
      filtered = filtered.filter(equipment =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.serial_number?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(equipment => equipment.status === statusFilter);
    }

    setFilteredEquipments(filtered);
  };

  const deleteEquipment = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este equipamento?')) return;

    try {
      const { error } = await supabase
        .from('laiga_equipments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchEquipments();
      toast({
        title: 'Equipamento excluído',
        description: 'O equipamento foi removido com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o equipamento.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    window.location.href = '/coordenacao';
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'in_use':
        return 'secondary';
      case 'maintenance':
        return 'destructive';
      case 'unavailable':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'in_use':
        return 'Em Uso';
      case 'maintenance':
        return 'Manutenção';
      case 'unavailable':
        return 'Indisponível';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando equipamentos...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logoUfba} alt="UFBA Logo" />
        </div>
        <h1>Gerenciar Equipamentos LAIGA</h1>
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className={styles.content}>
        <div className="mb-6">
          <LaigaEquipmentUpload />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Equipamentos</CardTitle>
            <div className={styles.filters}>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, marca, modelo ou série..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.select}
                >
                  <option value="all">Todos os Status</option>
                  <option value="available">Disponível</option>
                  <option value="in_use">Em Uso</option>
                  <option value="maintenance">Manutenção</option>
                  <option value="unavailable">Indisponível</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.tableContainer}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Marca/Modelo</TableHead>
                    <TableHead>Série</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipments.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell className="font-medium">
                        {equipment.name}
                        {equipment.description && (
                          <div className="text-sm text-muted-foreground">
                            {equipment.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {equipment.brand && equipment.model
                          ? `${equipment.brand} - ${equipment.model}`
                          : equipment.brand || equipment.model || '-'}
                      </TableCell>
                      <TableCell>{equipment.serial_number || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(equipment.status)}>
                          {getStatusLabel(equipment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{equipment.location || '-'}</TableCell>
                      <TableCell>{equipment.responsible_person || '-'}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteEquipment(equipment.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredEquipments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum equipamento encontrado.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}