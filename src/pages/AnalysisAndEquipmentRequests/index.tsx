import React from 'react';
import { Paperclip, Wrench } from '@phosphor-icons/react';
import { IconLarge } from '../../components/Card/components/IconLarge';
import { TransparentCard } from '../../components/TransparentCard';
import styles from './request.module.css';
import { Highlight } from '../../components/Highlight';
import { Card } from '../../components/Card';
import { CheckBox } from '../../components/CheckBox';


export function AnalysisAndEquipmentRequests() {

    return (
        <div className={styles.AnalysisAndEquipmentRequestsContainer}>
            <TransparentCard>
                {/* <IconLarge>
                    <Wrench size={64} color='#363F5F' />
                </IconLarge> */}
                <Highlight
                    title='SOLICITAÇÕES DE ANÁLISES E USO DE EQUIPAMENTOS'
                    color='#363F5F'
                    subtitle='Para professores da UFBA'
                    colorSubtitle='#969CB2'
                />
            </TransparentCard>

            <ul className={styles.List}>
                <li className={styles.ListItem}>
                    Para Projetos de Pesquisa anexe a ata de aprovação no Departamento
                </li>

                <li className={styles.ListItem}>
                    Projetos com recursos serão convidados a auxiliar o laboratório com itens necessários ao seu funcionamento
                </li>

                <li className={styles.ListItem}>
                    Para Atividades  de Ensino anexe o Plano da Disciplina aprovado pelo Departamento no semestre corrente, contando o uso do(s) equipamento(s)
                </li>

                <li className={styles.ListItem}>
                    Para TCC's anexe o plano de trabalho apresentado na disciplina
                </li>

                <form className={styles.FormContainer} onSubmit={() => { }}>
                    <Card height={130}>
                        <div className={styles.Container}>
                            <h3 className={styles.FormTitle}>Tipo de Atividade</h3>
                            <CheckBox id='learn' label='Ensino' />
                            <CheckBox id='tcc' label='TCC' />
                            <CheckBox id='research' label='Projeto de Pesquisa' />
                            <CheckBox id='consultancy' label='Consultoria' />
                            <CheckBox id='others' label='Outras' />
                        </div>
                    </Card>

                    <Card>
                        <h3 className={styles.FormTitle}>Data de uso</h3>
                    </Card>

                    <Card height={110} >
                        <div className={styles.Container}>
                            <h3 className={styles.FormTitle}>Anexe o respectivo documento  necessário</h3>
                            <Paperclip size={64} color='black' />
                        </div>
                    </Card>

                    <Card height={110} >
                        <div className={styles.Container}>
                            <h3 className={styles.FormTitle}>Marque o(s) equipamento(s) desejado(s)</h3>
                            <CheckBox id='gravimeter' label='Gravímetro CG5 Scintrex' />
                            <CheckBox id='v8phoenix' label='V8-Phoenix' />
                        </div>
                    </Card>

                    <button className={styles.SendButton}>
                        <span className={styles.SendButtonTitle}>Enviar</span>
                    </button>

                </form>
            </ul>

        </div>
    )
}