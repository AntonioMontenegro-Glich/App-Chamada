document.getElementById('Lista de Presença-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const resumo_aula = document.getElementById('resumo_aula').value;
    const mensagem_do_aluno = document.getElementById('mensagem_do_aluno').value;
    const photoInput = document.getElementById('photo');
    const photo = await convertImageToBase64(photoInput.files[0]);

    navigator.geolocation.getCurrentPosition(async (position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/api/presencas', { // Certifique-se de que a rota da API está correta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, resumo_aula, mensagem_do_aluno, location, photo })
            });

            if (response.ok) {
                document.getElementById('Lista de Presença-form').reset();
                fetchPresencas();
            } else {
                console.error('Erro ao adicionar presença', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
        }
    });
});

async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function fetchPresencas() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/presencas'); // Certifique-se de que a rota da API está correta
        if (!response.ok) {
            throw new Error('Erro ao buscar Presença');
        }
        const presencas = await response.json();
        const list = document.getElementById('Presença-list');
        list.innerHTML = '';
        plantations.forEach(p => {
            const item = document.createElement('div');
            item.innerHTML = `
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <img src="${p.photo}" alt="${p.name}" style="max-width: 100%; height: auto;">
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar Presenças:', error);
    }
}

fetchPresencas();