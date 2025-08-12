<template>
    <!-- Saldo -->
    <div class="card text-center mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Saldo da Conta</h5>
            <h2 :class="saldoAtual >= 0 ? 'text-success' : 'text-danger'">
                R$ {{ formatCurrency(saldoAtual) }}
            </h2>
        </div>
    </div>

    <!-- Movimentações -->
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white">
            Movimentações Recentes
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-hover mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th class="text-end">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(mov, index) in movimentacoes" :key="index">
                        <td>{{ formatDate(mov.data_transacao) }}</td>
                        <td>{{ mov.descricao }}</td>
                        <td :class="mov.valor_centavos >= 0 ? 'text-success text-end' : 'text-danger text-end'">
                            {{ mov.valor_centavos >= 0 ? '+ ' : '- ' }}R$ {{ formatCurrency(Math.abs(mov.valor_centavos / 100)) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Botão de PIX -->
    <div class="d-grid">
        <button class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#pixModal">
            💸 Fazer PIX
        </button>
    </div>

    <!-- Modal PIX -->
    <div class="modal fade" id="pixModal" tabindex="-1" aria-labelledby="pixModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                
                <div class="modal-header">
                    <h5 class="modal-title" id="pixModalLabel">Fazer PIX</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>

                <div class="modal-body">
                    <p class="fw-bold text-black">Sua chave PIX: </p>
                    <p class="bg-light border rounded p-2 mb-3 text-black">
                        {{ chave }}
                    </p>

                    <div class="mb-3">
                        <label for="destinoPix" class="form-label">Chave PIX do destinatário</label>
                        <input type="text" class="form-control" id="destinoPix"
                            v-model="pixDestino" placeholder="Digite a chave PIX de destino">
                    </div>

                    <div class="mb-3">
                        <label for="valorPix" class="form-label">Valor (R$)</label>
                        <input type="number" step="0.01" min="0" class="form-control" id="valorPix"
                            v-model="pixValor" placeholder="Digite o valor">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" @click="fazerPix">Enviar PIX</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
    name: 'Saldo',
    data() {
        return {
            saldoAtual: 0,
            chave: "",
            movimentacoes: [],
            pixDestino: "",
            pixValor: ""
        }
    },
    methods: {
        async enviarTransferencia() {
            const token = VueCookies.get('token')
            const headers = { Authorization: `Bearer ${token}` }

            console.log("isso é um teste")
            await axios.post('https://3f4b00be35a1.ngrok-free.app/transfere/origem/NOT_FOUND/destino/TESTE/valor/1000', { headers })
            await axios.get('https://3f4b00be35a1.ngrok-free.app/chaves_pix', { headers })
        },
        async chavesPix() {
            const token = VueCookies.get('token')
            const headers = { Authorization: `Bearer ${token}` }

            console.log("isso é um teste")
            await axios.get('https://3f4b00be35a1.ngrok-free.app/chaves_pix', { headers })
        },
        async carregarDados() {
            try {
                const token = VueCookies.get('token')
                const headers = { Authorization: `Bearer ${token}` }

                // Buscar saldo
                const saldoRes = await axios.get('https://3f4b00be35a1.ngrok-free.app/saldo', { headers })
                this.saldoAtual = saldoRes.data.saldo / 100
                this.chave = saldoRes.data.usuario.chave
                this.usuarioId = saldoRes.data.usuario.id

                // Buscar movimentações
                const movRes = await axios.get('https://3f4b00be35a1.ngrok-free.app/extrato', { headers })
                this.movimentacoes = movRes.data.map(m => ({
                    ...m,
                    descricao: this.getDescricao(m)
                }))
            } catch (err) {
                console.error('Erro ao carregar saldo/extrato:', err)
            }
        },
        async fazerPix() {
            try {
                if (!this.pixDestino || !this.pixValor) {
                    alert("Preencha todos os campos.")
                    return
                }

                const token = VueCookies.get('token')
                const headers = { Authorization: `Bearer ${token}` }

                await axios.post('https://3f4b00be35a1.ngrok-free.app/transfere/destino/' + this.pixDestino + '/valor/' + Math.round(this.pixValor * 100), {}, { headers })
                alert("PIX enviado com sucesso!")
                
                // Atualiza dados
                this.carregarDados()

                // Limpa e fecha modal
                this.pixDestino = ""
                this.pixValor = ""
                const modalEl = document.getElementById('pixModal')
                const modal = bootstrap.Modal.getInstance(modalEl)
                modal.hide()
            } catch (err) {
                console.error("Erro ao enviar PIX:", err)
                alert("Erro ao enviar PIX")
            }
        },
        getDescricao(mov) {
            if (mov.nome_origem && mov.nome_destino) {
                if (mov.id_origem === this.usuarioId) {
                    return `PIX enviado - ${mov.nome_destino}`
                } else {
                    return `PIX recebido - ${mov.nome_origem}`
                }
            }
            return mov.descricao || 'Movimentação'
        },
        formatCurrency(valor) {
            return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        },
        formatDate(dateStr) {
            const d = new Date(dateStr)
            return d.toLocaleDateString('pt-BR')
        }
    },
    mounted() {
        this.carregarDados()
        this.enviarTransferencia()
        this.chavesPix()
    }
}
</script>