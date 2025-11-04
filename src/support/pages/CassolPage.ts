import { Page, expect } from '@playwright/test';
import CassolElements from '../elements/CassolElements';

export default class CassolPage {
  readonly elements: CassolElements;

  constructor(readonly page: Page) {
    this.elements = new CassolElements(page);
  }

  async preencherFormularioCompleto(): Promise<void> {
    const el = this.elements;
    await el.campoAssunto.fill('Dúvidas sobre pedido');
    await el.campoTipoPessoa.fill('Pessoa Física');
    await el.campoNome.fill('Paulo');
    await el.campoSobrenome.fill('da Silva');
    await el.campoCPF.fill('123.456.789-00');
    await el.campoEmail.fill('paulo@teste.com');
    await el.campoPedido.fill('99999999');
    await el.campoTelefone.fill('47999999999');
    await el.campoMensagem.fill('Realizando testes');
  }

  async preencherFormularioSemCPF(): Promise<void> {
    const el = this.elements;
    await el.campoAssunto.fill('Dúvidas sobre entrega');
    await el.campoTipoPessoa.fill('Pessoa Física');
    await el.campoNome.fill('Paulo');
    await el.campoSobrenome.fill('da Silva');
    // CPF não preenchido
    await el.campoEmail.fill('paulo@teste.com');
    await el.campoPedido.fill('99999999');
    await el.campoTelefone.fill('47999999999');
    await el.campoMensagem.fill('Realizando testes');
  }

  async preencherFormularioSemTelefone(): Promise<void> {
    const el = this.elements;
    await el.campoAssunto.fill('Dúvidas sobre entrega');
    await el.campoTipoPessoa.fill('Pessoa Física');
    await el.campoNome.fill('Paulo');
    await el.campoSobrenome.fill('da Silva');
    await el.campoCPF.fill('123.456.789-00');
    await el.campoEmail.fill('paulo@teste.com');
    await el.campoPedido.fill('99999999');
    // Telefone não preenchido
    await el.campoMensagem.fill('Realizando testes');
  }

  async preencherFormularioComEmailInvalido(): Promise<void> {
    const el = this.elements;
    await el.campoAssunto.fill('Dúvidas sobre pedido');
    await el.campoTipoPessoa.fill('Pessoa Física');
    await el.campoNome.fill('Paulo');
    await el.campoSobrenome.fill('da Silva');
    await el.campoCPF.fill('123.456.789-00');
    await el.campoEmail.fill('paulo@teste'); // e-mail Inválido
    await el.campoPedido.fill('99999999');
    await el.campoTelefone.fill('47999999999');
    await el.campoMensagem.fill('Realizando testes');
  }

  async enviarFormulario(): Promise<void> {
    const botao = this.elements.botaoEnviar;
    await botao.waitFor({ state: 'visible', timeout: 10000 });
    await botao.click();
  }

  async validarEnvio(): Promise<void> {
    await this.page.waitForTimeout(3000);
    const html = await this.page.content();
    expect(html).toMatch(/(obrigado|enviado com sucesso|mensagem recebida)/i);
  }

  async validarMensagemErroCPF(): Promise<void> {
    const el = this.elements;
    await this.elements.erroCPF.waitFor({ timeout: 5000 });
    // const mensagem = await this.elements.erroCPF.textContent();
    expect(el.erroCPF).toBeVisible();
  }

  async validarMensagemErroTelefone(): Promise<void> {
    const el = this.elements;
    await this.elements.erroTelefone.waitFor({ timeout: 5000 });
    // const mensagem = await this.elements.erroTelefone.textContent();
    expect(el.erroTelefone).toBeVisible();
  }

  async validarMensagemErroEmail(): Promise<void> {
    const el = this.elements;
    await this.elements.erroEmail.waitFor({ timeout: 5000 });
    // const mensagem = await this.elements.erroEmail.textContent();
    expect(el.erroEmail).toBeVisible();
  }

}