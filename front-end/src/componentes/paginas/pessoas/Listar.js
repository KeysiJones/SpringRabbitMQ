import axios from "axios";
import {useEffect, useState, useRef} from "react";

function Listar () {
    const [classeThead, setClasseThead] = useState('fundoSpringBoot');
    const [listaPosts, setListaPosts] = useState([]);

    const buscarRegistros = () => {

        let url = `http://localhost:8080/posts/`
        let data = {}
        // if(document.querySelector("#buscar").value.length > 0) {
        //     data.name = document.querySelector("#buscar").value
        // }
        axios ({
            method: 'get',
            dataType: 'json',
            url: url,
            params: data,
            before: () => console.log('before'),
            complete: () => console.log('complete'),
            error: (erro) => console.log(erro),
            dataExpression: true
        }).then((dados) => {
            console.log(dados.data);
        })
    }

    useEffect(() => {
        buscarRegistros()
    }, [])

    return (
    <>
        <div className="custom-control custom-switch">
            {/*<input type="checkbox" checked={true} className="custom-control-input" id="darkMode" onChange={() => console.log('mudou')}></input>
            <label className="custom-control-label" htmlFor="darkMode">DarkMode switch</label>*/}
        </div>
        <div>
            <h1 className="text-center mt-4 mb-4">Posts</h1>
        </div>
    </>
    )
}

export default Listar