import UpcomingImage from "../assets/chamado.png";
import UpcomingImage2 from "../assets/contosraros.png";
const UpcomingScreen = () => {
  return (
    <div className="div-container-projects">
      <div
        className="div-projects"        
      >
        <h1 className="h1-upcoming"       
        >
          Projetos
        </h1>
        <h2 className="h2-upcoming">Contos</h2>
        
        <div className="project-container upcoming-container">
          <div className="div-image-upcoming">
            <img
              className="image-upcoming"
              src={UpcomingImage}
              alt="book cover"
            />
          </div>
          <div>
          <h3 className="h3-upcoming">O Chamado</h3>
            <h4 className="h4-upcoming">Data de lançamento: Julho de 2025</h4>
            <div className="div-parag">
              <p>
                Quando o Departamento de Polícia de Harvie City recebe uma carta
                perturbadora de uma pessoa ameaçando "matar treze inocentes e um
                culpado" em "um ato de expiação pela morte desnecessária de um
                homem inocente", a detetive Izzy Jaynes não tem ideia do que
                pensar. Quatorze cidadãos estão prestes a ser massacrados em um
                ato desequilibrado de retribuição? Conforme a investigação se
                desenrola, Izzy percebe que o autor da carta está falando sério
                e pede ajuda à amiga Holly Gibney. Enquanto isso, a polêmica e
                franca ativista dos direitos das mulheres Kate McKay está
                embarcando em uma turnê de palestras por vários estados,
                atraindo locais lotados de fãs e detratores. Alguém que se opõe
                veementemente à mensagem de Kate sobre o empoderamento feminino
                está mirando nela e interrompendo seus eventos. A princípio,
                ninguém se machuca, mas o perseguidor está ficando mais ousado,
                e Holly é contratada para ser a guarda-costas de Kate — uma
                tarefa desafiadora com um empregador obstinado e um adversário
                determinado movido pela ira e sua crença em sua própria retidão.
                Apresentando um elenco fascinante de personagens antigos e
                novos, incluindo a mundialmente famosa cantora gospel Sista
                Bessie e um vilão inesquecível viciado em assassinato, essas
                narrativas gêmeas convergem em uma conclusão arrepiante e
                espetacular — um feito de narrativa que somente Stephen King
                poderia realizar. Emocionante, extremamente divertido e
                escandalosamente envolvente, O Chamado é um dos romances mais
                ricos e propulsivos de Wiese
              </p>
            </div>

            <a href="https://www.mercadolivre.com.br/" target="__blank">
              Reserve sua Cópia
            </a>
          </div>
        </div>
      </div>
      <div
        className="div-projects"        
      >
       
        <hr />
        <div className="project-container upcoming-container">
          <div className="div-image-upcoming">
            <img
              className="image-upcoming"
              src={UpcomingImage2}
              alt="book cover"
            />
          </div>
          <div>
          <h3 className="h3-upcoming">Contos Raros</h3>
            <h4 className="h4-upcoming">Data de lançamento: Julho de 2025</h4>
            <div className="div-parag">
              <p>
                Quando o Departamento de Polícia de Harvie City recebe uma carta
                perturbadora de uma pessoa ameaçando "matar treze inocentes e um
                culpado" em "um ato de expiação pela morte desnecessária de um
                homem inocente", a detetive Izzy Jaynes não tem ideia do que
                pensar. Quatorze cidadãos estão prestes a ser massacrados em um
                ato desequilibrado de retribuição? Conforme a investigação se
                desenrola, Izzy percebe que o autor da carta está falando sério
                e pede ajuda à amiga Holly Gibney. Enquanto isso, a polêmica e
                franca ativista dos direitos das mulheres Kate McKay está
                embarcando em uma turnê de palestras por vários estados,
                atraindo locais lotados de fãs e detratores. Alguém que se opõe
                veementemente à mensagem de Kate sobre o empoderamento feminino
                está mirando nela e interrompendo seus eventos. A princípio,
                ninguém se machuca, mas o perseguidor está ficando mais ousado,
                e Holly é contratada para ser a guarda-costas de Kate — uma
                tarefa desafiadora com um empregador obstinado e um adversário
                determinado movido pela ira e sua crença em sua própria retidão.
                Apresentando um elenco fascinante de personagens antigos e
                novos, incluindo a mundialmente famosa cantora gospel Sista
                Bessie e um vilão inesquecível viciado em assassinato, essas
                narrativas gêmeas convergem em uma conclusão arrepiante e
                espetacular — um feito de narrativa que somente Stephen King
                poderia realizar. Emocionante, extremamente divertido e
                escandalosamente envolvente, O Chamado é um dos romances mais
                ricos e propulsivos de Wiese.
              </p>
            </div>

            <a href="https://www.mercadolivre.com.br/" target="__blank">
              Reserve sua Cópia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingScreen;
