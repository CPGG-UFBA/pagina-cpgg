import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ReservationEmailProps {
  applicantName: string
  applicantEmail: string
  equipmentsList: string
  otherEquipment?: string
  peripherals?: string
  withdrawalDate: string
  returnDate: string
  purpose: string
  reservationId: string
}

export const ReservationEmail = ({
  applicantName,
  applicantEmail,
  equipmentsList,
  otherEquipment,
  peripherals,
  withdrawalDate,
  returnDate,
  purpose,
  reservationId,
}: ReservationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nova Solicitação de Reserva de Equipamentos - LAIGA</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nova Solicitação de Reserva de Equipamentos</Heading>
        <Text style={subtitle}>Laboratório Integrado de Geofísica Aplicada - LAIGA</Text>
        
        <Section style={section}>
          <Heading style={h2}>Dados do Solicitante</Heading>
          <Text style={text}><strong>Nome:</strong> {applicantName}</Text>
          <Text style={text}><strong>Email:</strong> {applicantEmail}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Heading style={h2}>Equipamentos Solicitados</Heading>
          <Text style={text}><strong>Da lista:</strong> {equipmentsList}</Text>
          {otherEquipment && (
            <Text style={text}><strong>Outros equipamentos:</strong> {otherEquipment}</Text>
          )}
          {peripherals && (
            <Text style={text}><strong>Periféricos adicionais:</strong> {peripherals}</Text>
          )}
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Heading style={h2}>Período de Uso</Heading>
          <Text style={text}><strong>Data de Retirada:</strong> {withdrawalDate}</Text>
          <Text style={text}><strong>Data de Devolução:</strong> {returnDate}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Heading style={h2}>Finalidade</Heading>
          <Text style={text}>{purpose}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={agreementSection}>
          <Text style={text}>✅ O solicitante concordou em expressar agradecimentos ao LAIGA/CPGG nos trabalhos apresentados.</Text>
          <Text style={text}>✅ O solicitante concordou em reportar problemas ou avarias no ato da devolução.</Text>
        </Section>

        <Hr style={hr} />

        <Section style={footerSection}>
          <Text style={text}><strong>Protocolo:</strong> {reservationId}</Text>
          <Text style={text}><strong>Data da Solicitação:</strong> {new Date().toLocaleString('pt-BR')}</Text>
        </Section>

        <Text style={footer}>
          Em anexo segue o comprovante de solicitação em PDF.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReservationEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
}

const subtitle = {
  color: '#666',
  fontSize: '16px',
  margin: '0 0 40px',
  padding: '0 40px',
}

const h2 = {
  color: '#592cbb',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px',
}

const section = {
  padding: '0 40px',
  marginBottom: '20px',
}

const text = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '5px 0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const agreementSection = {
  padding: '15px 40px',
  backgroundColor: '#f0f7ff',
  borderRadius: '5px',
  margin: '20px 40px',
}

const footerSection = {
  padding: '0 40px',
  marginTop: '20px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
  marginTop: '30px',
}
