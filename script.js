const inputCep = document.querySelector('#cep');
const rua = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');

inputCep.addEventListener('focusout', () => buscaEndereco(inputCep.value));

async function buscaEndereco(cep) {
    const msgErro = document.querySelector('#erro');
    msgErro.innerHTML = '';

    try {
        const consultaCep = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );
        const data = await consultaCep.json();
        if (data.erro) {
            throw Error('cep não existente!');
        }

        rua.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.localidade;
        estado.value = data.uf;

        console.log(data);
        return data;
    } catch (erro) {
        msgErro.innerHTML = `<p>Cep inválido. Tente novamente</p>`;
        rua.value = '';
        bairro.value = '';
        cidade.value = '';
        estado.value = '';
        console.log(erro);
    }
}
