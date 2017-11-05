# Chartlotte Hotel Reservation - Single Page Application

Esta SPA foi desenvolvida como teste para Front-End Developer na Red Ventures.

O que eu utilizei:

* SASS
* JQUERY
* FLATPICKR CALENDAR PLUGIN
* JQUERY TOUCH PUNCH
* SLIDER RANGE JQUERY + JQUERY UI
* FONTAWESOME

Sobre o App:

O app consisite em uma página responsiva de reserva de hotéis na cidade de Charlotte, NC, USA.

Sua estrutura é definida por um header, uma section contendo um calendário para selecionar a data de check-in e check-out.

Ao selecionar as datas e clicar no botão de busca, a página carrega um arquivo JSON que traz dentro dos resultados de cada hotel: Imagem, Classificação por estrelas, Descrição e Preço total. Ao clicar em "Price History", abre-se um modal exibindo o histórico de preço dos últimos 7 meses.

Funcionalidades:

Criei um método (linha 79 a 83 functions.js) para ordenar os resultados por preço, do maior para o menor, pois o JSON não possui uma ordem do tipo. Então, os resultados já são carregados calculando o preço total (linha 107 a 109).

É possível filtrar os resultados por preço mínimo e preço máximo através de um slider que funciona nos dispositivos mobile e também por classificação por estrelas.

Na classificação por estrelas, caso o método não encontre nos resultados um hotel com tal classificação, dispara uma mensagem para o usuário. Nesse teste, não há hotéis com 1 estrela, então ao clicar na primeira estrela o modal aparecerá. Porém o método funciona com todos os resultados, caso o JSON seja atualizado e traga um hotel com 1 estrela.

Dependências:

O app não tem nenhuma dependência para rodar além de estar online para trazer os arquivos dos CDN's.

Modificações:

Fiz algumas modificações no plugin Flatpickr para se adequar às necessidades do app quando ao estilo e funcionalidades, o arquivo flatpickr.css também sofreu algumas modificações nas linhas 721 a 750.


O teste está disponível também aqui: <a href="http://vegners.com/projects/testerv/" target="_blank">Charlotte Hotel Reservation</a>
