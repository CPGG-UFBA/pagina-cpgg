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
import { LogOut, Download, FileText, BarChart3, Calendar, User, MapPin, Clock } from 'lucide-react'
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
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLab, setFilterLab] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
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

  // Dados para gráficos
  const getReservationsByLab = () => {
    const labCount = filteredReservations.reduce((acc, reservation) => {
      const lab = reservation.tipo_reserva || 'Não especificado'
      acc[lab] = (acc[lab] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(labCount).map(([name, value]) => ({ name, value }))
  }

  const getReservationsByUser = () => {
    const userCount = filteredReservations.reduce((acc, reservation) => {
      const user = `${reservation.nome} ${reservation.sobrenome}`
      acc[user] = (acc[user] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(userCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }))
  }

  const getReservationsByUsage = () => {
    const usageCount = filteredReservations.reduce((acc, reservation) => {
      const usage = reservation.uso || 'Não especificado'
      acc[usage] = (acc[usage] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(usageCount).map(([name, value]) => ({ name, value }))
  }

  const getReservationsByMonth = () => {
    const monthCount = filteredReservations.reduce((acc, reservation) => {
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
        <h1>Gerenciamento de Reservas</h1>
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className={styles.content}>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">
              <FileText className="w-4 h-4 mr-2" />
              Lista de Reservas
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Gráficos e Relatórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
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
                <option value="Auditório">Auditório</option>
                <option value="Sala de Reunião">Sala de Reunião</option>
                <option value="LAIGA">LAIGA</option>
                <option value="LAGEP">LAGEP</option>
                <option value="LAMOD">LAMOD</option>
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reservas ({filteredReservations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div id="reservations-table" className={styles.tableContainer}>
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
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {reservation.nome} {reservation.sobrenome}
                            </div>
                          </TableCell>
                          <TableCell>{reservation.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {reservation.tipo_reserva}
                            </div>
                          </TableCell>
                          <TableCell>{reservation.uso}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {formatDate(reservation.inicio)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {formatDate(reservation.termino)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(reservation.status)}>
                              {reservation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(reservation.created_at)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
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
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reservas por Laboratório/Espaço</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getReservationsByLab()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getReservationsByLab().map((entry, index) => (
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
                  <CardTitle>Top 10 Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getReservationsByUser()}>
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

              <Card>
                <CardHeader>
                  <CardTitle>Reservas por Tipo de Uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getReservationsByUsage()}>
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
                    <LineChart data={getReservationsByMonth()}>
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

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>{filteredReservations.length}</div>
                    <div className={styles.statLabel}>Total de Reservas</div>
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
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>
                      {filteredReservations.filter(r => r.status === 'rejeitada').length}
                    </div>
                    <div className={styles.statLabel}>Rejeitadas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}