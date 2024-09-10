import { Conta } from "./Conta"
import { Rede } from "./Rede";
import { Post } from "./Post"
import * as readlineSync from 'readline-sync';

console.log("teste")
function main() {
    const redeSocial = new Rede()  // cria nova instância da classe Feed, 
                                   //que é responsável por gerenciar contas e posts na rede social.
    let contaLogada: Conta | null = null
                                  // variável contaLogada é declarada. Ela é do tipo Conta ou null, 
                                  // o que significa que ela pode armazenar uma instância de Conta (quando um usuário está logado) 
                                  // ou null (quando nenhum usuário está logado).
                                  // Inicialmente, contaLogada é definida como null porque, no início do programa, nenhum usuário está logado.


    while (true) {
        console.clear()
        console.log(`
         ▄         ▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
        ▐░▌       ▐░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
        ▐░▌       ▐░▌▐░▌░▌     ▐░▌ ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ 
        ▐░▌       ▐░▌▐░▌▐░▌    ▐░▌     ▐░▌     ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     
        ▐░▌       ▐░▌▐░▌ ▐░▌   ▐░▌     ▐░▌     ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     
        ▐░▌       ▐░▌▐░▌  ▐░▌  ▐░▌     ▐░▌     ▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     
        ▐░▌       ▐░▌▐░▌   ▐░▌ ▐░▌     ▐░▌     ▐░▌          ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌     ▐░▌     
        ▐░▌       ▐░▌▐░▌    ▐░▌▐░▌     ▐░▌     ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     
        ▐░█▄▄▄▄▄▄▄█░▌▐░▌     ▐░▐░▌ ▄▄▄▄█░█▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     
        ▐░░░░░░░░░░░▌▐░▌      ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     
         ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀         ▀       ▀      
                                                                                                   `)
        if(contaLogada){
            console.log(`USERNAME: ${contaLogada.getNomeUsuario()}. ${contaLogada.getSeguindo()}`)
        }
        console.log('[01] Criar conta\n[02] Login\n[03] Logout\n[04] Criar post\n[05] Buscar posts de um usuário\n[06] Seguir usuário\n[07] Enviar mensagem\n[08] Ver mensagens\n[09] Ver notificações\n[00] Sair')
        const escolha = readlineSync.question('Escolha opcao: ')

        switch (escolha) {
            case '01':
                contaLogada = redeSocial.criarConta()
                break
            case '02':
                contaLogada = redeSocial.login()
                break

            case '03':
                    if (contaLogada) {
                        redeSocial.logout()
                        contaLogada = null
                    } else {
                        console.clear()
                        readlineSync.question("Você não está logado. Tecle ENTER para continuar...") 
                    }

            case '04':
                if (contaLogada) {
                    const conteudo = readlineSync.question('Conteudo do post: ')
                    contaLogada.criarPost(conteudo)
                    console.log('Post criado com sucesso!')
                } else {
                    console.log('Você precisa estar logado para criar um post.')
                }
                break

            case '05':
                console.clear()
                if (contaLogada) {
                    let loopProcurarPosts = true
                    while(loopProcurarPosts){
                        console.log('PROCURAR POSTS DE UM USUÁRIO')
                        let opcaoProcurarPost = readlineSync.question("Digite o nome do usuário ou 00 para retornar: ")
                        let contaPuxada = redeSocial.puxaContaPeloNick(opcaoProcurarPost)
                        if((opcaoProcurarPost != '00') && contaPuxada){
                            console.clear()
                            let contadorDePosts = 1
                            for(let post of contaPuxada.getPosts()){
                                console.log(`*********************************************`)
                                console.log(`${contadorDePosts}) ${contaPuxada.getNomeUsuario()}: ${post.getConteudo()}
                                            Curtidas: ${post.getCurtidas().length}`) 
                                for(let comentarioDoPost of post.comentarios){
                                    console.log(`${comentarioDoPost[1]}: ${comentarioDoPost[0]}`)
                                }
                                contadorDePosts++
                            }
                            let menuPosts = true
                            while (menuPosts){
                                let opcaoMenuPosts = readlineSync.questionInt("Digite o numero do post que deseja interagir ou 00 para retornar: ")
                                if(opcaoMenuPosts <= contaPuxada.getPosts().length && opcaoMenuPosts != 0){
                                    let opcaoInteracaoPost = readlineSync.questionInt("Digite 1 para curtir, 2 para comentar e 0 para voltar: ")
                                    switch (opcaoInteracaoPost){
                                        case 1:
                                            console.clear()
                                            contaPuxada.getPosts()[opcaoInteracaoPost - 1].curtir(contaLogada, redeSocial)
                                            readlineSync.question("Post curtido. Tecle ENTER para continuar...")
                                            menuPosts = false 
                                            loopProcurarPosts = false
                                        break;
                                        case 2:
                                            console.clear()
                                            let comentario = readlineSync.question("Digite o comentário: ")
                                            //console.log(contaPuxada.getPosts()[opcaoMenuPosts - 1].comentar(contaLogada, comentario))
                                            contaPuxada.getPosts()[opcaoMenuPosts - 1].comentar(contaLogada, comentario, redeSocial)
                                            readlineSync.question("Comentário postado. Tecle ENTER para continuar...")
                                            menuPosts = false
                                            loopProcurarPosts = false
                                        break;
                                        case 0:
                                            menuPosts = false
                                        break;
                                        default:
                                            readlineSync.question("Opção inválida, tente novamente: ")
                                        break;
                                    }
                                } else {
                                    menuPosts = false 
                                    loopProcurarPosts = false
                                }
                            }
                        } else if (opcaoProcurarPost === '00') {
                            loopProcurarPosts = false
                        } else {
                            readlineSync.question("Conta não encontrada. Tecle ENTER para continuar...")
                            loopProcurarPosts = false
                        }
                    }
                } else {
                    readlineSync.question('Você precisa estar logado para ver o feed. Tecle ENTER para continuar...')
                }
                break

            case '06':
                if (contaLogada) {
                    const idParaSeguir = readlineSync.questionInt('ID da conta para seguir: ')
                    const contaParaSeguir = redeSocial.contas.find(c => c.getId() === idParaSeguir)
                    if (contaParaSeguir) {
                        contaLogada.seguir(contaParaSeguir)
                        console.log(`Agora você está seguindo ${contaParaSeguir.getNomeUsuario()}.`)
                    } else {
                        console.log('Conta não encontrada.')
                    }
                } else {
                    console.log('Você precisa estar logado para seguir um usuário.')
                }
                break

            case '07':
                if (contaLogada) {
                    const idDestino = readlineSync.questionInt('ID da conta para enviar mensagem: ')
                    const contaDestino = redeSocial.contas.find(c => c.getId() === idDestino)
                    if (contaDestino) {
                        const mensagem = readlineSync.question('Mensagem: ')
                        contaLogada.enviarMensagem(contaDestino, mensagem)
                        readlineSync.question("Mensagem enviada com sucesso. Tecle ENTER para continuar...") 
                    } else {
                        readlineSync.question("Conta não encontrada. Tecle ENTER para continuar...") 
                    }
                } else {
                    readlineSync.question("Você precisa estar logado para isso. Tecle ENTER para continuar...") 
                }
                break
                case '08':
                    if(contaLogada){
                        contaLogada.exibirMensagens(redeSocial)
                    }
                break;
                case '09':
                    if(contaLogada){
                        contaLogada.exibirNotificacoes()
                    }
                break;
                case '00':
                    console.log('Encerrando o simulador...')
                    return

 //               case '00':
 //               if (contaLogada) {
 //                   redeSocial.logout()
 //                   contaLogada = null
 //               } else {
 //                   console.log('Você não está logado.')
  //              }
                break


                default:
                console.log('Opção inválida.')
        }
    }
}

main()