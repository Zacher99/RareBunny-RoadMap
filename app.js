function normalizarTexto(texto) {
    // Remove espaços e hífens e transforma o texto para minúsculas
    return texto.replace(/\s|-/g, "").toLowerCase();
}

function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome de uma área ou tecnologia.</p>";
        return;
    }

    // Normalizar o termo pesquisado
    let campoPesquisaNormalizado = normalizarTexto(campoPesquisa);

    let resultados = "";

    // Definindo os objetos de cada área
    const areas = {
        "frontend": descricaoFrontEnd,
        "devops": descricaoDevOps,
        "backend": descricaoBackend,
        "cloud": descricaoCloud
    };

    // Verifica se o termo pesquisado corresponde a uma área (normalizando a chave da área)
    if (areas[campoPesquisaNormalizado]) {
        // Se for uma área, percorre todos os campos e exibe todas as tecnologias e descrições relacionadas
        let areaSelecionada = areas[campoPesquisaNormalizado];

        for (let categoria in areaSelecionada) {
            let tecnologias = areaSelecionada[categoria];

            resultados += `<h2>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>`;

            for (let tecnologia in tecnologias) {
                resultados += `
                    <div class="item-resultado">
                        <h3>${tecnologia}</h3>
                        <p>${tecnologias[tecnologia]}</p>
                        <a href="https://reactjs.org/docs/getting-started.html" target="_blank">Documentação</a>
                    </div>
                `;
            }
        }
    } else {
        // Se não for uma área, pesquisa por uma tecnologia específica dentro de todas as áreas
        let objetos = [descricaoFrontEnd, descricaoDevOps, descricaoBackend, descricaoCloud];

        for (let objeto of objetos) {
            for (let categoria in objeto) {
                let tecnologias = objeto[categoria];

                for (let tecnologia in tecnologias) {
                    if (normalizarTexto(tecnologia).includes(campoPesquisaNormalizado)) {
                        resultados += `
                            <div class="item-resultado">
                                <h2>${tecnologia}</h2>
                                <p>${tecnologias[tecnologia]}</p>
                            </div>
                        `;
                    }
                }
            }
        }
    }

    // Se não houver resultados, exibe uma mensagem
    if (!resultados) {
        resultados = "<p>Nenhum resultado encontrado para o termo pesquisado.</p>";
    }

    section.innerHTML = resultados;
}
