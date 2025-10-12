import { useState, useEffect } from "react";
import { Header } from "../../../../components/Header";
import { Footer } from "../../../../components/Footer";
import { supabase } from "../../../../integrations/supabase/client";
import { LaigaEquipmentEditor } from "../../../../components/LaigaEquipmentEditor";
import styles from "./LaigaReservation.module.css";
import { toast } from "@/hooks/use-toast";

export function RF() {
  const [equipments, setEquipments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    selectedEquipments: [] as string[],
    otherEquipment: "",
    peripherals: "",
    withdrawalDate: "",
    returnDate: "",
    purpose: "",
    applicantName: "",
    applicantEmail: "",
    agreementAccepted: false,
    damageReportAgreement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch equipments from database
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const { data, error } = await supabase
        .from("laiga_equipment")
        .select("name")
        .eq("is_available", true)
        .order("name");

      if (error) throw error;

      const equipmentNames = (data || []).map((item) => item.name).sort();
      setEquipments(equipmentNames);
    } catch (error: any) {
      console.error("Erro ao buscar equipamentos:", error);
      // Fallback to hardcoded list if database fails
      setEquipments(
        [
          "Elrec Pro",
          "Gamaespectrômetro RS125",
          "Gerador Honda EG5500",
          "GPR SIR 3000",
          "GPR SIR 4000",
          "GPR SIR 20",
          "GPS diferencial SP60",
          "GPS Etrex10",
          "Gravímetro CG5",
          "Magnetômetro Marinho G882",
          "Magnetômetro Terrestre GSN19",
          "Sismógrafo Geode48",
          "Susceptibilímetro KT10",
          "Syscal Pro",
          "VLF T-VLF",
          "V8 Phoenix",
        ].sort(),
      );
    }
  };

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        selectedEquipments: [...prev.selectedEquipments, equipment],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedEquipments: prev.selectedEquipments.filter((eq) => eq !== equipment),
      }));
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Updated: 2025-10-12 20:40 - Fixed redirect and email

    // Validações
    if (formData.selectedEquipments.length === 0 && !formData.otherEquipment) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um equipamento",
        variant: "destructive",
      });
      return;
    }

    if (!formData.withdrawalDate || !formData.returnDate) {
      toast({
        title: "Erro",
        description: "Preencha as datas de retirada e devolução",
        variant: "destructive",
      });
      return;
    }

    if (!formData.purpose || !formData.applicantName || !formData.applicantEmail) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.applicantEmail)) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreementAccepted) {
      toast({
        title: "Erro",
        description: "Você deve aceitar o termo de agradecimentos",
        variant: "destructive",
      });
      return;
    }

    if (!formData.damageReportAgreement) {
      toast({
        title: "Erro",
        description: "Você deve aceitar o termo de responsabilidade sobre avarias",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Enviando dados para a função:", formData);

      const { data, error } = await supabase.functions.invoke("send-laiga-reservation", {
        body: formData,
      });

      console.log("Resposta da função:", { data, error });

      if (error) {
        console.error("Erro da função:", error);
        throw error;
      }

      console.log("Sucesso! Dados recebidos:", data);
      console.log("ID da reserva:", data?.reservationId);

      toast({
        title: "Sucesso",
        description: "Solicitação enviada! Redirecionando para o comprovante...",
      });

      // Redirecionar para comprovante imediatamente
      if (data?.reservationId) {
        console.log("Redirecionando para:", `/Labs/Laiga/Receipt?id=${data.reservationId}`);
        window.location.href = `/Labs/Laiga/Receipt?id=${data.reservationId}`;
      } else {
        console.error("Nenhum reservationId retornado!");
      }

      // Resetar formulário
      setFormData({
        selectedEquipments: [],
        otherEquipment: "",
        peripherals: "",
        withdrawalDate: "",
        returnDate: "",
        purpose: "",
        applicantName: "",
        applicantEmail: "",
        agreementAccepted: false,
        damageReportAgreement: false,
      });
    } catch (error: any) {
      console.error("Erro ao enviar solicitação:", error);
      console.error("Detalhes do erro:", {
        message: error?.message,
        details: error?.details,
        stack: error?.stack,
      });

      toast({
        title: "Erro",
        description: `Erro ao enviar solicitação: ${error?.message || "Erro desconhecido"}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <LaigaEquipmentEditor onEquipmentChange={setEquipments} />
        <h1 className={styles.title}>Formulário de Reserva de Equipamentos - LAIGA</h1>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <label>Equipamentos Disponíveis:</label>
              <div className={styles.equipmentList}>
                {equipments.map((equipment) => (
                  <div key={equipment} className={styles.equipmentItem}>
                    <input
                      type="checkbox"
                      id={equipment}
                      checked={formData.selectedEquipments.includes(equipment)}
                      onChange={(e) => handleEquipmentChange(equipment, e.target.checked)}
                    />
                    <label htmlFor={equipment}>{equipment}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.form}>
              <label htmlFor="otherEquipment">Outro equipamento não listado acima?</label>
              <input
                type="text"
                id="otherEquipment"
                value={formData.otherEquipment}
                onChange={(e) => handleInputChange("otherEquipment", e.target.value)}
                placeholder="Digite outros equipamentos necessários"
              />
            </div>

            <div className={styles.form}>
              <label htmlFor="peripherals">
                Algum periférico adicional? (ex: rolo de cabos, tenda, garra d'água, eletrodos, etc)
              </label>
              <textarea
                id="peripherals"
                value={formData.peripherals}
                onChange={(e) => handleInputChange("peripherals", e.target.value)}
                placeholder="Descreva os periféricos necessários"
                rows={3}
              />
            </div>

            <div className={styles.dateContainer}>
              <div className={styles.form}>
                <label htmlFor="withdrawalDate">Data de Retirada *</label>
                <input
                  type="date"
                  id="withdrawalDate"
                  value={formData.withdrawalDate}
                  onChange={(e) => handleInputChange("withdrawalDate", e.target.value)}
                  required
                />
              </div>

              <div className={styles.form}>
                <label htmlFor="returnDate">Data de Devolução *</label>
                <input
                  type="date"
                  id="returnDate"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange("returnDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.form}>
              <label htmlFor="purpose">Utilidade *</label>
              <select
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                required
              >
                <option value="">Selecione a finalidade</option>
                <option value="TCC">TCC</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
                <option value="Projeto de Pesquisa">Projeto de Pesquisa</option>
                <option value="Uso em disciplina">Uso em disciplina</option>
                <option value="Consultoria/Serviços">Consultoria/Serviços</option>
                <option value="Curso">Curso</option>
              </select>
            </div>

            <div className={styles.form}>
              <label htmlFor="applicantName">Nome do Solicitante *</label>
              <input
                type="text"
                id="applicantName"
                value={formData.applicantName}
                onChange={(e) => handleInputChange("applicantName", e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div className={styles.form}>
              <label htmlFor="applicantEmail">Email do Solicitante *</label>
              <input
                type="email"
                id="applicantEmail"
                value={formData.applicantEmail}
                onChange={(e) => handleInputChange("applicantEmail", e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="agreement"
                checked={formData.agreementAccepted}
                onChange={(e) => handleInputChange("agreementAccepted", e.target.checked)}
                required
              />
              <label htmlFor="agreement">
                <strong>
                  Estou de acordo em expressar agradecimentos ao LAIGA/CPGG pelo uso do(s) equipamento(s) utilizado(s)
                  nos trabalhos apresentados *
                </strong>
              </label>
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="damageReport"
                checked={formData.damageReportAgreement}
                onChange={(e) => handleInputChange("damageReportAgreement", e.target.checked)}
                required
              />
              <label htmlFor="damageReport">
                <strong>
                  Estou de acordo em reportar no ato da entrega de possíveis problemas ou avarias que o(s)
                  equipamento(s) tenham sofridos durante o uso *
                </strong>
              </label>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
