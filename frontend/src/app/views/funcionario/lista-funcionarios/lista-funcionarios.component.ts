import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { Funcionario } from 'src/app/entidade/funcionario';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-lista-funcionarios',
	templateUrl: './lista-funcionarios.component.html',
	styleUrls: ['./lista-funcionarios.component.css'],
})
export class ListaFuncionariosComponent implements OnInit {

	public funcionarios : Funcionario[];

	public totalItens : number = 0;

	public itemsPerPage : number = 20;

	public currentPage : number = 1;

	constructor(private funcionarioService : FuncionarioService) {
		this.funcionarios = [];
	 }

	ngOnInit() {
		this.findAll(0);
	}

	delete(func : Funcionario) {
		let dadosFuncionario : string = String(func.idFuncionario);
		dadosFuncionario += ' - ' + func.nome;
		dadosFuncionario += ' ' + func.sobrenome;
		let resultadoConfirmacao = confirm('Tem certeza que deseja excluir o funcionário ' + dadosFuncionario + ' ?');
		if (resultadoConfirmacao) {
			this.funcionarioService.delete(func).subscribe(() => {
				this.findAll(this.currentPage - 1);
			});
		}
	}

	pageChanged(event : any) {
		let page : number = event.page - 1;
		this.findAll(page);
	}

	private findAll(page : number) : void {
		this.funcionarioService.findAll(page).subscribe((res) => {
			this.funcionarios = res['content'];
			this.totalItens = res['totalElements'];
		});
	}

}
