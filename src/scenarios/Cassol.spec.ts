import { test, expect } from '@playwright/test';
import CassolPage from '../support/pages/CassolPage';

test.describe('Testes funcionais no site da Cassol', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.cassol.com.br/fale-conosco');
  });

  test('Validar envio do formulário completo', async ({ page }) => {
    const cassolPage = new CassolPage(page);
    await cassolPage.preencherFormularioCompleto();
    await cassolPage.enviarFormulario();
    await cassolPage.validarEnvio();
  });

  test('Validar formulário sem CPF', async ({ page }) => {
    const cassolPage = new CassolPage(page);
    await cassolPage.preencherFormularioSemCPF();
    await cassolPage.enviarFormulario();

    const erro = await cassolPage.validarMensagemErroCPF();
    expect(erro).toContain('Este é um campo obrigatório');
  });

  test('Validar formulário sem Telefone', async ({ page }) => {
    const cassolPage = new CassolPage(page);
    await cassolPage.preencherFormularioSemTelefone();
    await cassolPage.enviarFormulario();

    const erro = await cassolPage.validarMensagemErroTelefone();
    expect(erro).toContain('Este é um campo obrigatório');
  });

  test('Validar formulário com e-mail inválido', async ({ page }) => {
    const cassolPage = new CassolPage(page);
    await cassolPage.preencherFormularioComEmailInvalido();
    await cassolPage.enviarFormulario();

    const erro = await cassolPage.validarMensagemErroEmail();
    expect(erro).toContain('Por favor, insira um endereço de e-mail válido');
  });
});