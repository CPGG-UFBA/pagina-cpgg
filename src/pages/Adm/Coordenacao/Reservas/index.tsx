import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { LogOut, Download, FileText, BarChart3, Calendar, User, MapPin, Clock, ArrowLeft, Edit, Save, X } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import logocpgg from '@/assets/cpgg-logo.jpg'
import styles from './reservas.module.css'

interface Reservation {
  id: string
  nome: string
  sobrenome: string
  email: string
  uso: string
  tipo_reserva: string
  inicio: string
  termino: string
  status: string
  created_at: string
  equipamento?: string
}

interface AdminUser {
  id: string
  email: string
  role: string
}

export function ReservasAdmin() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([])
  const [physicalSpaceReservations, setPhysicalSpaceReservations] = useState<Reservation[]>([])
  const [laboratoryReservations, setLaboratoryReservations] = useState<Reservation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLab, setFilterLab] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Reservation>>({})
  const { toast } = useToast()
  const navigate = useNavigate()

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  useEffect(() => {
    const userData = sessionStorage.getItem('admin_user')
    if (userData) {
      setAdminUser(JSON.parse(userData))
    } else {
      navigate('/adm/coordenacao')
    }
  }, [navigate])

  useEffect(() => {
    if (adminUser) {
      fetchReservations()
    }
  }, [adminUser])

  useEffect(() => {
    filterReservations()
  }, [reservations, searchTerm, filterLab, filterStatus])

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setReservations(data || [])
    } catch (error: any) {
      console.error('Erro ao buscar reservas:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar reservas",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterReservations = () => {
    let filtered = reservations

    if (searchTerm) {
      filtered = filtered.filter(reservation =>
        reservation.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.uso.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterLab !== 'all') {
      filtered = filtered.filter(reservation =>
        reservation.tipo_reserva === filterLab
      )
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(reservation =>
        reservation.status === filterStatus
      )
    }

    setFilteredReservations(filtered)

    // Separate into physical spaces and laboratories
    const physicalSpaces = ['auditorio', 'sala_reuniao']
    const laboratories = ['laiga_equipments', 'lagep', 'lamod']

    const physicalSpaceFiltered = filtered.filter(reservation =>
      physicalSpaces.includes(reservation.tipo_reserva)
    )

    const laboratoryFiltered = filtered.filter(reservation =>
      laboratories.includes(reservation.tipo_reserva)
    )

    setPhysicalSpaceReservations(physicalSpaceFiltered)
    setLaboratoryReservations(laboratoryFiltered)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_user')
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    })
    navigate('/adm')
  }

  const updateReservationStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      await fetchReservations()
      toast({
        title: "Sucesso",
        description: "Status da reserva atualizado",
      })
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar status da reserva",
        variant: "destructive",
      })
    }
  }

  const handleEditReservation = (reservation: Reservation) => {
    setEditingId(reservation.id)
    setEditData({ ...reservation })
  }

  const handleSaveEdit = async () => {
    if (!editingId || !editData) return

    try {
      const { error } = await supabase
        .from('reservations')
        .update(editData)
        .eq('id', editingId)

      if (error) throw error

      await fetchReservations()
      setEditingId(null)
      setEditData({})
      toast({
        title: "Sucesso",
        description: "Reserva atualizada com sucesso",
      })
    } catch (error: any) {
      console.error('Erro ao atualizar reserva:', error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar reserva",
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const generatePDF = async () => {
    const element = document.getElementById('reservations-table')
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('l', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30

      // Header
      pdf.setFontSize(16)
      pdf.text('Relatório de Reservas - CPGG', pdfWidth / 2, 20, { align: 'center' })
      
      // Data
      pdf.setFontSize(10)
      pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, pdfHeight - 10)
      
      // Table
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      pdf.save('relatorio-reservas.pdf')
      
      toast({
        title: "Sucesso",
        description: "PDF gerado com sucesso!",
      })
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      toast({
        title: "Erro",
        description: "Erro ao gerar PDF",
        variant: "destructive",
      })
    }
  }

  // Dados para gráficos - Espaços Físicos
  const getPhysicalSpaceReservationsByType = () => {
    const typeCount = physicalSpaceReservations.reduce((acc, reservation) => {
      const type = reservation.tipo_reserva || 'Não especificado'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(typeCount).map(([name, value]) => ({ 
      name: name === 'auditorio' ? 'Auditório' : name === 'sala_reuniao' ? 'Sala de Reunião' : name, 
      value 
    }))
  }

  // Dados para gráficos - Laboratórios
  const getLaboratoryReservationsByType = () => {
    const typeCount = laboratoryReservations.reduce((acc, reservation) => {
      const type = reservation.tipo_reserva || 'Não especificado'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(typeCount).map(([name, value]) => ({ 
      name: name === 'laiga_equipments' ? 'LAIGA' : name.toUpperCase(), 
      value 
    }))
  }

  const getReservationsByUser = (reservations: Reservation[]) => {
    const userCount = reservations.reduce((acc, reservation) => {
      const user = `${reservation.nome} ${reservation.sobrenome}`
      acc[user] = (acc[user] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(userCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }))
  }

  const getReservationsByUsage = (reservations: Reservation[]) => {
    const usageCount = reservations.reduce((acc, reservation) => {
      const usage = reservation.uso || 'Não especificado'
      acc[usage] = (acc[usage] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(usageCount).map(([name, value]) => ({ name, value }))
  }

  const getReservationsByMonth = (reservations: Reservation[]) => {
    const monthCount = reservations.reduce((acc, reservation) => {
      const date = new Date(reservation.created_at)
      const month = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      acc[month] = (acc[month] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(monthCount).map(([name, value]) => ({ name, value }))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'aprovada':
        return 'default'
      case 'rejeitada':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG Logo" />
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/adm/coordenacao/dashboard')} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Button>
          <h1>Gerenciamento de Reservas</h1>
        </div>
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className={styles.content}>
        <Tabs defaultValue="physical-spaces" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="physical-spaces">
              <MapPin className="w-4 h-4 mr-2" />
              Espaços Físicos ({physicalSpaceReservations.length})
            </TabsTrigger>
            <TabsTrigger value="laboratories">
              <FileText className="w-4 h-4 mr-2" />
              Laboratórios ({laboratoryReservations.length})
            </TabsTrigger>
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
          </TabsList>

          {/* Espaços Físicos Tab */}
          <TabsContent value="physical-spaces" className="space-y-4">
            <div className={styles.filters}>
              <Input
                placeholder="Buscar por nome, email ou uso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              
              <select
                value={filterLab}
                onChange={(e) => setFilterLab(e.target.value)}
                className={styles.select}
              >
                <option value="all">Todos os Espaços</option>
                <option value="auditorio">Auditório</option>
                <option value="sala_reuniao">Sala de Reunião</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.select}
              >
                <option value="all">Todos os Status</option>
                <option value="pendente">Pendente</option>
                <option value="aprovada">Aprovada</option>
                <option value="rejeitada">Rejeitada</option>
              </select>

              <Button onClick={generatePDF} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Gerar PDF
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reservas por Espaço Físico</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getPhysicalSpaceReservationsByType()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getPhysicalSpaceReservationsByType().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Usuários - Espaços Físicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getReservationsByUser(physicalSpaceReservations)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={10}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reservas de Espaços Físicos ({physicalSpaceReservations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div id="physical-spaces-table" className={styles.tableContainer}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Espaço</TableHead>
                        <TableHead>Uso</TableHead>
                        <TableHead>Início</TableHead>
                        <TableHead>Término</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Solicitação</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {physicalSpaceReservations.map((reservation) => {
                        const isEditing = editingId === reservation.id
                        return (
                          <TableRow key={reservation.id}>
                            <TableCell>
                              {isEditing ? (
                                <div className="flex gap-1">
                                  <Input
                                    value={editData.nome || ''}
                                    onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                                    placeholder="Nome"
                                    className="w-20 text-sm"
                                  />
                                  <Input
                                    value={editData.sobrenome || ''}
                                    onChange={(e) => setEditData({ ...editData, sobrenome: e.target.value })}
                                    placeholder="Sobrenome"
                                    className="w-20 text-sm"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  {reservation.nome} {reservation.sobrenome}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  value={editData.email || ''}
                                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                  placeholder="Email"
                                  className="w-24 text-sm"
                                />
                              ) : (
                                reservation.email
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <select
                                  value={editData.tipo_reserva || ''}
                                  onChange={(e) => setEditData({ ...editData, tipo_reserva: e.target.value })}
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="auditorio">Auditório</option>
                                  <option value="sala_reuniao">Sala de Reunião</option>
                                </select>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {reservation.tipo_reserva === 'auditorio' ? 'Auditório' : 'Sala de Reunião'}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  value={editData.uso || ''}
                                  onChange={(e) => setEditData({ ...editData, uso: e.target.value })}
                                  placeholder="Uso"
                                  className="w-20 text-sm"
                                />
                              ) : (
                                reservation.uso
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  type="datetime-local"
                                  value={editData.inicio ? new Date(editData.inicio).toISOString().slice(0, 16) : ''}
                                  onChange={(e) => setEditData({ ...editData, inicio: e.target.value })}
                                  className="w-32 text-sm"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {formatDate(reservation.inicio)}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  type="datetime-local"
                                  value={editData.termino ? new Date(editData.termino).toISOString().slice(0, 16) : ''}
                                  onChange={(e) => setEditData({ ...editData, termino: e.target.value })}
                                  className="w-32 text-sm"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {formatDate(reservation.termino)}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <select
                                  value={editData.status || ''}
                                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="pendente">Pendente</option>
                                  <option value="aprovada">Aprovada</option>
                                  <option value="rejeitada">Rejeitada</option>
                                </select>
                              ) : (
                                <Badge variant={getStatusBadgeVariant(reservation.status)}>
                                  {reservation.status}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(reservation.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {isEditing ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={handleSaveEdit}
                                    >
                                      <Save className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleCancelEdit}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleEditReservation(reservation)}
                                    >
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    {reservation.status === 'pendente' && (
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => updateReservationStatus(reservation.id, 'aprovada')}
                                        >
                                          Aprovar
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => updateReservationStatus(reservation.id, 'rejeitada')}
                                        >
                                          Rejeitar
                                        </Button>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Laboratórios Tab */}
          <TabsContent value="laboratories" className="space-y-4">
            <div className={styles.filters}>
              <Input
                placeholder="Buscar por nome, email ou uso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              
              <select
                value={filterLab}
                onChange={(e) => setFilterLab(e.target.value)}
                className={styles.select}
              >
                <option value="all">Todos os Laboratórios</option>
                <option value="laiga_equipments">LAIGA</option>
                <option value="lagep">LAGEP</option>
                <option value="lamod">LAMOD</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.select}
              >
                <option value="all">Todos os Status</option>
                <option value="pendente">Pendente</option>
                <option value="aprovada">Aprovada</option>
                <option value="rejeitada">Rejeitada</option>
              </select>

              <Button onClick={generatePDF} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Gerar PDF
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reservas por Laboratório</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getLaboratoryReservationsByType()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getLaboratoryReservationsByType().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Usuários - Laboratórios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getReservationsByUser(laboratoryReservations)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={10}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reservas de Laboratórios ({laboratoryReservations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div id="laboratories-table" className={styles.tableContainer}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Laboratório/Espaço</TableHead>
                        <TableHead>Uso</TableHead>
                        <TableHead>Início</TableHead>
                        <TableHead>Término</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Solicitação</TableHead>
                        <TableHead>Equipamento</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {laboratoryReservations.map((reservation) => {
                        const isEditing = editingId === reservation.id
                        return (
                          <TableRow key={reservation.id}>
                            <TableCell>
                              {isEditing ? (
                                <div className="flex gap-1">
                                  <Input
                                    value={editData.nome || ''}
                                    onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                                    placeholder="Nome"
                                    className="w-20 text-sm"
                                  />
                                  <Input
                                    value={editData.sobrenome || ''}
                                    onChange={(e) => setEditData({ ...editData, sobrenome: e.target.value })}
                                    placeholder="Sobrenome"
                                    className="w-20 text-sm"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  {reservation.nome} {reservation.sobrenome}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  value={editData.email || ''}
                                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                  placeholder="Email"
                                  className="w-24 text-sm"
                                />
                              ) : (
                                reservation.email
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <select
                                  value={editData.tipo_reserva || ''}
                                  onChange={(e) => setEditData({ ...editData, tipo_reserva: e.target.value })}
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="laiga_equipments">LAIGA</option>
                                  <option value="lagep">LAGEP</option>
                                  <option value="lamod">LAMOD</option>
                                </select>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {reservation.tipo_reserva === 'laiga_equipments' ? 'LAIGA' : reservation.tipo_reserva.toUpperCase()}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  value={editData.uso || ''}
                                  onChange={(e) => setEditData({ ...editData, uso: e.target.value })}
                                  placeholder="Uso"
                                  className="w-20 text-sm"
                                />
                              ) : (
                                reservation.uso
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  type="datetime-local"
                                  value={editData.inicio ? new Date(editData.inicio).toISOString().slice(0, 16) : ''}
                                  onChange={(e) => setEditData({ ...editData, inicio: e.target.value })}
                                  className="w-32 text-sm"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {formatDate(reservation.inicio)}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  type="datetime-local"
                                  value={editData.termino ? new Date(editData.termino).toISOString().slice(0, 16) : ''}
                                  onChange={(e) => setEditData({ ...editData, termino: e.target.value })}
                                  className="w-32 text-sm"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {formatDate(reservation.termino)}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <select
                                  value={editData.status || ''}
                                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                  className="border rounded px-2 py-1 text-sm"
                                >
                                  <option value="pendente">Pendente</option>
                                  <option value="aprovada">Aprovada</option>
                                  <option value="rejeitada">Rejeitada</option>
                                </select>
                              ) : (
                                <Badge variant={getStatusBadgeVariant(reservation.status)}>
                                  {reservation.status}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(reservation.created_at)}</TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  value={editData.equipamento || ''}
                                  onChange={(e) => setEditData({ ...editData, equipamento: e.target.value })}
                                  placeholder="Equipamento"
                                  className="w-20 text-sm"
                                />
                              ) : (
                                reservation.equipamento || 'N/A'
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {isEditing ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={handleSaveEdit}
                                    >
                                      <Save className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleCancelEdit}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleEditReservation(reservation)}
                                    >
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    {reservation.status === 'pendente' && (
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => updateReservationStatus(reservation.id, 'aprovada')}
                                        >
                                          Aprovar
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => updateReservationStatus(reservation.id, 'rejeitada')}
                                        >
                                          Rejeitar
                                        </Button>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visão Geral Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{physicalSpaceReservations.length}</div>
                      <div className={styles.statLabel}>Espaços Físicos</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{laboratoryReservations.length}</div>
                      <div className={styles.statLabel}>Laboratórios</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>
                        {filteredReservations.filter(r => r.status === 'pendente').length}
                      </div>
                      <div className={styles.statLabel}>Pendentes</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>
                        {filteredReservations.filter(r => r.status === 'aprovada').length}
                      </div>
                      <div className={styles.statLabel}>Aprovadas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Espaços Físicos', value: physicalSpaceReservations.length },
                          { name: 'Laboratórios', value: laboratoryReservations.length }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#8884d8" />
                        <Cell fill="#00C49F" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reservas por Tipo de Uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getReservationsByUsage(filteredReservations)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={10}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reservas por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getReservationsByMonth(filteredReservations)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={10}
                      />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}