import { Page, Locator } from '@playwright/test';

export default class CassolElements {
  constructor(private readonly page: Page) {}

  // Campos do formulário
  get campoAssunto(): Locator { 
    return this.page.locator('#field_3_1746737986_1'); 
  }

  get campoTipoPessoa(): Locator { 
    return this.page.locator('#field_3_1746737986_2'); 
  }

  get campoNome(): Locator { 
    return this.page.locator('#field_3_1746737986_3'); 
  }

  get campoSobrenome(): Locator { 
    return this.page.locator('#field_3_1746737986_4'); 
  }

  get campoCPF(): Locator { 
    return this.page.locator('#field_3_1746737986_5'); 
  }

  get campoEmail(): Locator { 
    return this.page.locator('#field_3_1746737986_6'); 
  }

  get campoPedido(): Locator { 
    return this.page.locator('#field_3_1746737986_7'); 
  }

  get campoTelefone(): Locator { 
    return this.page.locator('#field_3_1746737986_8'); 
  }

  get campoMensagem(): Locator { 
    return this.page.locator('#field_3_1746737986_9'); 
  }

  get botaoEnviar(): Locator { 
    return this.page.locator('button.action.submit.primary[title="Enviar"]'); 
  }
  
  // Mensagens de erro
  get erroCPF(): Locator { 
    return this.page.locator('text=Este é um campo obrigatório'); 
  }

  get erroTelefone(): Locator { 
    return this.page.locator('text=Este é um campo obrigatório'); 
  }

  get erroEmail(): Locator { 
    return this.page.locator('text=Por favor, insira um endereço de e-mail válido'); 
  }

}