import ReactDOM from 'react-dom'
import $ from 'jquery'
import DataTable from "datatables.net"
import DataTablesBootstrap from "datatables.net-bs4"
import jsZip from 'jszip';
import Buttons from 'datatables.net-buttons'
import Bs4Buttons from 'datatables.net-buttons-bs4'
import 'datatables.net-buttons/js/buttons.flash.js'
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'
import 'datatables.net-fixedheader-dt'
import 'pdfmake'
import 'datatables.net-autofill-bs4'
import 'datatables.net-select-dt'
import {useEffect} from 'react'

function Tabela(props) {
    //console.log(props.checked === true)
    if (props.checked === true) {
        $(`#${props.tableId}`).addClass('table-dark')
    }

    if (props.checked === false) {
        $(`#${props.tableId}`).removeClass('table-dark')
    }

        useEffect(() => {
            console.log('use effect')
            if (props.checked === true) {
                $(`#${props.tableId}`).addClass('table-dark')
            }
    
            if (props.checked === false) {
                $(`#${props.tableId}`).removeClass('table-dark')
            }
            
            let tabela = $(`#${props.tableId}`).DataTable({
                "processing": true,
                fixedHeader: true,
                select: true,
                responsive: true,
                autoWidth: true,
                language: {
                    select: {
                        rows: {
                            _: "%d registros selecionados",
                            1: "1 registro selecionado"
                        }
                    },
                    url: 'http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json'
                },
                //'ajax' : '/users/listar',
                //'serverSide' : true,
                // ajax: {
                //     url: props.dataUrl,
                //     dataSrc: ''
                // },
                data: props.data,
                columns: [
                     { data: 'id' },
                     { data: 'name' },
                     { data: 'email' },
                     {defaultContent: '<button>editar</button>'}
                ],
                columnDefs: [
                    {
                        targets: [1],
                        createdCell: (td, cellData, rowData) => {
                            td.id = `name-${rowData.id}`
                        }
                    },
                    {
                        targets: [2],
                        createdCell: (td, cellData, rowData) => {
                            td.id = `email-${rowData.id}`
                        }
                    },
                    {
                        targets: [3],
                        width: 180,
                        className: "text-center",
                        createdCell: (td, cellData, rowData) => {
                            ReactDOM.render(
                                <>
                                    <button 
                                        className="btn btn-info mr-2"
                                        id={`editar-${rowData.id}`}
                                        onClick={() => {
                                            let nome = document.querySelector(`#name-${rowData.id}`)
                                            nome.innerHTML = `<input type="text" id="name-${rowData.id}"></input>`;
                                            }}>Editar
                                    </button>                           
                                    <button 
                                        className="btn btn-danger"
                                        id={`deletar-${rowData.id}`}
                                        onClick={() => {console.log('deletando')}}>Deletar
                                    </button>
                                </>
                            , td)
                        }
                    }
                ],
                //f é o find, barra de pesquisa
                dom: '<"d-flex space-between"lfB>t<"d-flex space-between"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        text: '<span class="material-icons">description</span>',
                        className: 'btn btn-success',
                        titleAttr: 'Exportar relatório em Excel',
                        exportOptions: {
                            columns: ':visible',
                            rows: ':visible'
                        }
                    },
                    {
                        extend: 'pdf',
                        text: '<span class="material-icons">picture_as_pdf</span>',
                        className: 'btn btn-danger',
                        titleAttr: 'Exportar relatório em PDF',
                        exportOptions: {
                            columns: ':visible',
                            rows: ':visible'
                        }
                    },
                    {
                        extend: 'csv',
                        text: '<span class="material-icons">description</span>',
                        className: 'btn btn-primary',
                        titleAttr: 'Exportar relatório em CSV',
                        exportOptions: {
                            columns: ':visible',
                            rows: ':visible'
                        }
                    },
                    {
                        extend: 'print',
                        text: '<span class="material-icons">local_printshop</span>',
                        className: 'btn btn-info',
                        titleAttr: 'Imprimir relatório',
                        exportOptions: {
                            columns: ':visible',
                            rows: ':visible'
                        }
                    },
                    {
                        extend: 'colvis',
                        text: 'Colunas',
                        className: 'btn btn-warning',
                        titleAttr: 'Clique para selecionar quais colunas deseja ver'
                    },
                    // {
                    //     extend: 'copy',
                    //     text: '<span class="material-icons">content_copy</span>',
                    //     className: 'btn btn-danger',
                    //     titleAttr: 'Copiar para a àrea de transferência'
    
                    // }
                ],
                "lengthMenu": [ 5, 10, 25, 50, 75, 100, 200, 300, 500 ]
            });



            $(`#${props.tableId} > tbody > button`).on( 'click', 'tr', function () {
                console.log( tabela.row( this ).data() );
            });

            window.JSZip = jsZip;

        }, [])

    return (
        <>
           <div className='text-center btn-group' id="botoes"></div>
           <table id={props.tableId} className={props.tableClass} style={{width: '100%'}}>
               <thead className={props.theadTfootClassName}>
                   <tr>
                       <th style={{borderTopLeftRadius: '10px'}}>Id</th>
                       <th>Name</th>
                       <th>Email</th>
                       <th style={{borderTopRightRadius: '10px'}}>Ações</th>
                   </tr>
               </thead>
               <tbody style={{backgroundColor: props.tbodyColor}}></tbody>
               <tfoot className={props.theadTfootClassName}>
                   <tr>
                       <th style={{borderBottomLeftRadius: '10px'}}>Id</th>
                       <th>Name</th>
                       <th>Email</th>
                       <th style={{borderBottomRightRadius: '10px'}}>Ações</th>
                   </tr>
               </tfoot>
           </table>
        </>
    )
}

export default Tabela