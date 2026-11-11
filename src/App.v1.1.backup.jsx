import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { 
  Menu, X, Play, Radio, TrendingUp, ChevronRight, Bookmark, Share2, 
  ChevronLeft, Image, Mic, Film, Sparkles, Calendar, MapPin, Layers, 
  CreditCard, Mail, BookOpen, Users, Globe, ExternalLink, ArrowRight, 
  ShieldCheck, Search, Filter, Volume2, CheckCircle2, History, Disc, FileSearch
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState('todos');
  const [selectedEstado, setSelectedEstado] = useState('SP');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const gridRef = useRef(null);
  const sliderRef = useRef(null);

  // Lista Completa de Estaduais CUT Brasil
  const estaduais = [
    { uf: 'AC', nome: 'Acre', presidente: 'Edmilson Araújo', sindicatos: 45 },
    { uf: 'AL', nome: 'Alagoas', presidente: 'Luciano Silva', sindicatos: 82 },
    { uf: 'AM', nome: 'Amazonas', presidente: 'Valdemir Santana', sindicatos: 110 },
    { uf: 'AP', nome: 'Amapá', presidente: 'Nalha Amapá', sindicatos: 38 },
    { uf: 'BA', nome: 'Bahia', presidente: 'Leninha Valente', sindicatos: 195 },
    { uf: 'CE', nome: 'Ceará', presidente: 'Luma Andrade', sindicatos: 140 },
    { uf: 'DF', nome: 'Distrito Federal', presidente: 'Rodrigo Rodrigues', sindicatos: 95 },
    { uf: 'ES', nome: 'Espírito Santo', presidente: 'Clemilde Cortes', sindicatos: 88 },
    { uf: 'GO', nome: 'Goiás', presidente: 'Flávio Silva', sindicatos: 105 },
    { uf: 'MA', nome: 'Maranhão', presidente: 'Arnaldo Gonçalves', sindicatos: 130 },
    { uf: 'MG', nome: 'Minas Gerais', presidente: 'Jairo Nogueira', sindicatos: 220 },
    { uf: 'MS', nome: 'Mato Grosso do Sul', presidente: 'Vilson Gimenes', sindicatos: 75 },
    { uf: 'MT', nome: 'Mato Grosso', presidente: 'Henrique Lopes', sindicatos: 90 },
    { uf: 'PA', nome: 'Pará', presidente: 'Vera Paoloni', sindicatos: 160 },
    { uf: 'PB', nome: 'Paraíba', presidente: 'Tião Santos', sindicatos: 85 },
    { uf: 'PE', nome: 'Pernambuco', presidente: 'Paulo Rocha', sindicatos: 150 },
    { uf: 'PI', nome: 'Piauí', presidente: 'Paulo Bezerra', sindicatos: 70 },
    { uf: 'PR', nome: 'Paraná', presidente: 'Márcio Kieller', sindicatos: 175 },
    { uf: 'RJ', nome: 'Rio de Janeiro', presidente: 'Sandro Cezar', sindicatos: 180 },
    { uf: 'RN', nome: 'Rio Grande do Norte', presidente: 'Eliane Bandeira', sindicatos: 65 },
    { uf: 'RO', nome: 'Rondônia', presidente: 'Elisabeth Leite', sindicatos: 50 },
    { uf: 'RR', nome: 'Roraima', presidente: 'Chico de Assis', sindicatos: 30 },
    { uf: 'RS', nome: 'Rio Grande do Sul', presidente: 'Amarildo Cenci', sindicatos: 210 },
    { uf: 'SC', nome: 'Santa Catarina', presidente: 'Anna Julia Johnston', sindicatos: 145 },
    { uf: 'SE', nome: 'Sergipe', presidente: 'Roberto Silva', sindicatos: 60 },
    { uf: 'SP', nome: 'São Paulo', presidente: 'Raimundo Suzart', sindicatos: 340 },
    { uf: 'TO', nome: 'Tocantins', presidente: 'José Roque', sindicatos: 40 },
  ];

  // Ramos da CUT
  const ramos = [
    { nome: 'Confetam', setor: 'Municipais', icone: Users, cor: 'bg-blue-600' },
    { nome: 'CNTE', setor: 'Educação', icone: BookOpen, cor: 'bg-emerald-600' },
    { nome: 'Contraf-CUT', setor: 'Bancários', icone: CreditCard, cor: 'bg-amber-600' },
    { nome: 'CNM-CUT', setor: 'Metalúrgicos', icone: Layers, cor: 'bg-red-600' },
    { nome: 'CNTRTT', setor: 'Transportes', icone: Globe, cor: 'bg-purple-600' },
    { nome: 'CNTV', setor: 'Vigilantes', icone: ShieldCheck, cor: 'bg-indigo-600' },
  ];

  // 3 Mídias Raspadas do Acervo CEDOC CUT
  const multimediaItems = [
    {
      id: 1,
      type: 'foto',
      category: 'Fotografia Histórica',
      title: 'Congresso de Fundação da CUT (1983)',
      year: '1983',
      duration: 'Acervo PMSBC / CEDOC',
      image: '/images/conclat-1983-fundacao.jpg',
      description: 'Plenária com 5.059 delegados e delegadas fundando a Central Única dos Trabalhadores no Pavilhão do Vera Cruz em São Bernardo do Campo.'
    },
    {
      id: 2,
      type: 'video',
      category: 'Película de Época',
      title: 'Primeiro Conclat: A Fundação da CUT',
      year: '1983',
      duration: 'Documentário Raro',
      image: '/images/conclat-1983-delegados.jpg',
      description: 'Filme histórico gravado em agosto de 1983 retratando a infraestrutura, os debates políticos e a animação dos delegados fundadores.'
    },
    {
      id: 3,
      type: 'foto',
      category: 'Marca & Memória',
      title: '10º CONCUT: Desenvolvimento com Renda e Direitos',
      year: '2009',
      duration: 'Cartaz Oficial',
      image: '/images/10concut-2009.jpg',
      description: 'Selo oficial e identidade visual histórica do 10º Congresso Nacional da CUT (Congresso José Olívio).'
    }
  ];

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bento-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F7F7F9] font-sans overflow-x-hidden text-cut-dark selection:bg-cut-red selection:text-white">
      {/* Noise Overlay */}
      <div className="noise-overlay pointer-events-none"></div>

      {/* Top Utility Bar */}
      <div className="bg-cut-dark text-white text-xs py-2 px-6 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center gap-6">
            <span className="text-gray-400">Quinta-feira, 01 de Outubro de 2026</span>
          </div>
          <div className="flex items-center gap-6 text-gray-300">
            <a href="#estaduais" className="hover:text-cut-red transition-colors">Estaduais</a>
            <a href="#ramos" className="hover:text-cut-red transition-colors">Ramos & Setores</a>
            <a href="#servicos" className="hover:text-cut-red transition-colors flex items-center gap-1"><CreditCard size={12} /> Boletos</a>
            <a href="#servicos" className="hover:text-cut-red transition-colors flex items-center gap-1"><Mail size={12} /> Webmail</a>
            <a href="#multimedia" className="hover:text-cut-red transition-colors">CEDOC</a>
          </div>
        </div>
      </div>

      {/* Header Principal - Vermelho CUT (#E52229) */}
      <header className="sticky top-0 z-50 bg-cut-red text-white border-b border-red-700/50 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              className="md:hidden p-2 text-white hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo Oficial da CUT (SVG extraído de www.cut.org.br) */}
            <a href="#" className="flex items-center gap-2 group">
              <img 
                src="/images/logo-cut-oficial.svg" 
                alt="CUT - Central Única dos Trabalhadores" 
                className="h-8 sm:h-9 w-auto filter drop-shadow brightness-0 invert group-hover:scale-105 transition-transform" 
              />
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-7 text-xs font-black uppercase tracking-wider text-white">
            <a href="#noticias" className="hover:text-black transition-colors py-1 border-b-2 border-transparent hover:border-black">Notícias</a>
            <a href="#campanhas" className="hover:text-black transition-colors py-1 border-b-2 border-transparent hover:border-black">Campanhas</a>
            <a href="#multimedia" className="hover:text-black transition-colors py-1 border-b-2 border-transparent hover:border-black">CEDOC</a>
            <a href="#estaduais" className="hover:text-black transition-colors py-1 border-b-2 border-transparent hover:border-black">Estaduais</a>
            <a href="#ramos" className="hover:text-black transition-colors py-1 border-b-2 border-transparent hover:border-black">Ramos</a>
            <a href="#institucional" className="hover:text-black transition-colors py-1 border-b-2 border-transparent hover:border-black">Institucional</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="magnetic-btn bg-white text-cut-red hover:bg-black hover:text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg shadow-black/20 transition-all flex items-center gap-1.5">
              <span>✊</span> Associe-se à Luta
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="pt-24 px-8 flex flex-col space-y-6 text-xl font-black uppercase tracking-tight">
          <a href="#noticias" className="hover:text-cut-red" onClick={() => setIsMenuOpen(false)}>📰 Notícias</a>
          <a href="#campanhas" className="hover:text-cut-red" onClick={() => setIsMenuOpen(false)}>✊ Campanhas</a>
          <a href="#multimedia" className="text-cut-red" onClick={() => setIsMenuOpen(false)}>🏛️ CEDOC Multimídia</a>
          <a href="#estaduais" className="hover:text-cut-red" onClick={() => setIsMenuOpen(false)}>📍 Estaduais</a>
          <a href="#ramos" className="hover:text-cut-red" onClick={() => setIsMenuOpen(false)}>🛠️ Ramos</a>
          <a href="#institucional" className="hover:text-cut-red" onClick={() => setIsMenuOpen(false)}>🤝 Institucional</a>
        </div>
      </div>

      {/* Plantão Ticker - Loop Infinito Perfeito Com 🔥 entre notícias */}
      <div className="bg-cut-dark text-white text-xs py-2.5 px-4 overflow-hidden border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <span className="bg-cut-red text-white font-extrabold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest shrink-0">
            PLANTÃO
          </span>
          <div className="overflow-hidden whitespace-nowrap text-gray-300 font-medium w-full">
            <div className="animate-marquee flex items-center gap-8">
              <span>Mobilização Nacional em Brasília aprova pauta de reivindicações 🔥 Reformulação da jornada de trabalho entra em pauta no Congresso 🔥 CUT comemora novo acordo coletivo dos bancários 🔥 Convenção da OIT sobre trabalho em plataformas ganha adesão nacional 🔥</span>
              <span>Mobilização Nacional em Brasília aprova pauta de reivindicações 🔥 Reformulação da jornada de trabalho entra em pauta no Congresso 🔥 CUT comemora novo acordo coletivo dos bancários 🔥 Convenção da OIT sobre trabalho em plataformas ganha adesão nacional 🔥</span>
            </div>
          </div>
        </div>
      </div>

      <main ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* 1. BENTO GRID DE NOTÍCIAS */}
        <section id="noticias" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* MATÉRIA PRINCIPAL / MANCHETE */}
            <div 
              onClick={() => setActiveModalItem({
                title: 'Acompanhe ao vivo o início do debate sobre o fim da escala 6x1, no Senado',
                category: 'BORA PRESSIONAR!',
                image: '/images/cut-news-1.png',
                text: 'Com grande presença de trabalhadores e mobilização sindical, o Senado debate hoje a Proposta de Emenda à Constituição sobre a redução da jornada de trabalho sem redução salarial.'
              })}
              className="bento-item lg:col-span-8 bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group cursor-pointer"
            >
              <div className="flex flex-row md:flex-col items-stretch w-full h-full">
                <div className="relative w-36 sm:w-48 md:w-full h-auto md:h-96 shrink-0 overflow-hidden">
                  <img 
                    src="/images/cut-news-1.png" 
                    alt="Manchete Principal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent hidden md:block"></div>
                  
                  <span className="hidden md:inline-block absolute top-4 left-4 bg-cut-red text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg">
                    BORA PRESSIONAR!
                  </span>
                </div>

                <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="md:hidden bg-red-50 text-cut-red text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full w-fit mb-2 block">
                      BORA PRESSIONAR!
                    </span>
                    <h2 className="font-display text-sm sm:text-base md:text-3xl font-black text-cut-red md:text-gray-900 leading-snug md:leading-tight group-hover:text-cut-red transition-colors mb-1 md:mb-3 line-clamp-2 md:line-clamp-none">
                      Acompanhe ao vivo o início do debate sobre o fim da escala 6x1, no Senado
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      PEC aprovada por unanimidade na Câmara avança para análise dos senadores. CUT convoca mobilização contínua.
                    </p>
                  </div>
                  <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna de 2 Notícias Secundárias */}
            <div className="bento-item lg:col-span-4 flex flex-col gap-4 md:gap-6">
              
              {/* Notícia Secundária 1 */}
              <div 
                onClick={() => setActiveModalItem({
                  title: 'Grupo tenta barrar votação do fim da escala 6x1 no Senado',
                  category: 'FIM DA 6X1 JÁ!',
                  image: '/images/cut-news-2.jpg',
                  text: 'Central Única dos Trabalhadores alerta para articulações no Congresso e reforça pressão junto aos parlamentares.'
                })}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-500 flex-1 flex flex-col justify-between group cursor-pointer p-0 md:p-5"
              >
                {/* No Desktop (PC): Card Padrão com foto topo ou sem corte esticado. No Mobile: Horizontal. */}
                <div className="hidden md:block">
                  <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2.5 py-1 rounded-full w-fit mb-3 block">
                    FIM DA 6X1 JÁ!
                  </span>
                  <h3 className="font-display text-lg font-black text-gray-900 leading-snug group-hover:text-cut-red transition-colors mb-2">
                    Grupo tenta barrar votação do fim da escala 6x1
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                    Trabalhadores mantêm vigília contínua pela aprovação imediata no Senado.
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* No Mobile: Layout Horizontal Estreito */}
                <div className="flex flex-row items-stretch w-full md:hidden">
                  <div className="relative w-36 shrink-0 overflow-hidden">
                    <img 
                      src="/images/cut-news-2.jpg" 
                      alt="Notícia"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full w-fit mb-1.5 block">
                        FIM DA 6X1 JÁ!
                      </span>
                      <h3 className="font-display text-sm font-black text-cut-red leading-snug mb-1 line-clamp-2">
                        Grupo tenta barrar votação do fim da escala 6x1
                      </h3>
                      <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                        Trabalhadores mantêm vigília contínua pela aprovação imediata no Senado.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                      <span>Ler matéria completa</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notícia Secundária 2 */}
              <div 
                onClick={() => setActiveModalItem({
                  title: 'Convocação à mobilização em defesa da classe trabalhadora',
                  category: 'ELEIÇÕES 2026',
                  image: '/images/cut-news-3.jpg',
                  text: 'CUT convoca todos os seus sindicatos filiados para ações integradas de mobilização pelos direitos sociais.'
                })}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-500 flex-1 flex flex-col justify-between group cursor-pointer p-0 md:p-5"
              >
                {/* No Desktop (PC): Card Padrão com foto topo ou sem corte esticado. No Mobile: Horizontal. */}
                <div className="hidden md:block">
                  <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2.5 py-1 rounded-full w-fit mb-3 block">
                    ELEIÇÕES 2026
                  </span>
                  <h3 className="font-display text-lg font-black text-gray-900 leading-snug group-hover:text-cut-red transition-colors mb-2">
                    Convocação à mobilização em defesa do Brasil e da classe trabalhadora
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                    Resolução nacional convoca engajamento das bases sindicais em todo o país.
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* No Mobile: Layout Horizontal Estreito */}
                <div className="flex flex-row items-stretch w-full md:hidden">
                  <div className="relative w-36 shrink-0 overflow-hidden">
                    <img 
                      src="/images/cut-news-3.jpg" 
                      alt="Notícia"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full w-fit mb-1.5 block">
                        ELEIÇÕES 2026
                      </span>
                      <h3 className="font-display text-sm font-black text-cut-red leading-snug mb-1 line-clamp-2">
                        Convocação à mobilização em defesa do Brasil e da classe trabalhadora
                      </h3>
                      <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                        Resolução nacional convoca engajamento das bases sindicais em todo o país.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                      <span>Ler matéria completa</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SEGUNDA LINHA DE 4 MATÉRIAS (TOP-IMAGE NO DESKTOP / HORIZONTAL NO MOBILE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            
            {/* Matéria 4 */}
            <div 
              onClick={() => setActiveModalItem({
                title: 'Fim da escala 6x1 começa a ser debatido hoje no Senado',
                category: 'A PARTIR DAS 14H',
                image: '/images/cut-news-4.jpg',
                text: 'Saiba como pressionar os senadores do seu estado para votar a favor da redução da jornada.'
              })}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Desktop (PC): Imagem em cima, texto embaixo */}
              <div className="hidden md:flex md:flex-col justify-between h-full p-5">
                <div>
                  <div className="h-40 -mx-5 -mt-5 mb-4 overflow-hidden relative">
                    <img src="/images/cut-news-4.jpg" alt="Matéria" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-cut-red text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      A PARTIR DAS 14H
                    </span>
                  </div>
                  <h4 className="font-display font-black text-base text-gray-900 leading-snug group-hover:text-cut-red transition-colors mb-2">
                    Fim da escala 6x1 entra na pauta oficial do Senado
                  </h4>
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    Confira o passo a passo para pressionar os parlamentares da sua região.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                  <span>Ver detalhes</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Mobile: Horizontal Estreito */}
              <div className="flex flex-row items-stretch w-full md:hidden">
                <div className="relative w-36 shrink-0 overflow-hidden">
                  <img src="/images/cut-news-4.jpg" alt="Matéria" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-1.5 block w-fit">
                      A PARTIR DAS 14H
                    </span>
                    <h4 className="font-display font-black text-sm text-cut-red leading-snug mb-1 line-clamp-2">
                      Fim da escala 6x1 entra na pauta oficial do Senado
                    </h4>
                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                      Confira o passo a passo para pressionar os parlamentares da sua região.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Matéria 5 */}
            <div 
              onClick={() => setActiveModalItem({
                title: 'UGT Espanha alerta sobre retrocesso e reafirma apoio à CUT',
                category: 'INTERNACIONAL',
                image: '/images/cut-news-5.jpg',
                text: 'Central espanhola envia nota de solidariedade internacional às pautas da classe trabalhadora brasileira.'
              })}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Desktop (PC): Imagem em cima, texto embaixo */}
              <div className="hidden md:flex md:flex-col justify-between h-full p-5">
                <div>
                  <div className="h-40 -mx-5 -mt-5 mb-4 overflow-hidden relative">
                    <img src="/images/cut-news-5.jpg" alt="Matéria" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      INTERNACIONAL
                    </span>
                  </div>
                  <h4 className="font-display font-black text-base text-gray-900 leading-snug group-hover:text-cut-red transition-colors mb-2">
                    UGT Espanha reafirma solidariedade e apoio à CUT
                  </h4>
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    União sindical internacional fortalece a resistência contra cortes de direitos.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                  <span>Ver detalhes</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Mobile: Horizontal Estreito */}
              <div className="flex flex-row items-stretch w-full md:hidden">
                <div className="relative w-36 shrink-0 overflow-hidden">
                  <img src="/images/cut-news-5.jpg" alt="Matéria" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-1.5 block w-fit">
                      INTERNACIONAL
                    </span>
                    <h4 className="font-display font-black text-sm text-cut-red leading-snug mb-1 line-clamp-2">
                      UGT Espanha reafirma solidariedade e apoio à CUT
                    </h4>
                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                      União sindical internacional fortalece a resistência contra cortes de direitos.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Matéria 6 */}
            <div 
              onClick={() => setActiveModalItem({
                title: 'Economista da UFRJ alerta para impactos negativos de cortes no PIB',
                category: 'ECONOMIA',
                image: '/images/cut-news-6.jpg',
                text: 'Estudo demonstra que propostas de teto excessivo levam o país à recessão e ao desemprego.'
              })}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Desktop (PC): Imagem em cima, texto embaixo */}
              <div className="hidden md:flex md:flex-col justify-between h-full p-5">
                <div>
                  <div className="h-40 -mx-5 -mt-5 mb-4 overflow-hidden relative">
                    <img src="/images/cut-news-6.jpg" alt="Matéria" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      ECONOMIA
                    </span>
                  </div>
                  <h4 className="font-display font-black text-base text-gray-900 leading-snug group-hover:text-cut-red transition-colors mb-2">
                    Economista alerta: corte desmedido gerará recessão
                  </h4>
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    Análise técnica defende investimentos públicos para geração de empregos formais.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                  <span>Ver detalhes</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Mobile: Horizontal Estreito */}
              <div className="flex flex-row items-stretch w-full md:hidden">
                <div className="relative w-36 shrink-0 overflow-hidden">
                  <img src="/images/cut-news-6.jpg" alt="Matéria" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-1.5 block w-fit">
                      ECONOMIA
                    </span>
                    <h4 className="font-display font-black text-sm text-cut-red leading-snug mb-1 line-clamp-2">
                      Economista alerta: corte desmedido gerará recessão
                    </h4>
                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                      Análise técnica defende investimentos públicos para geração de empregos formais.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Matéria 7 */}
            <div 
              onClick={() => setActiveModalItem({
                title: 'Proposta de corte no orçamento compromete ensino público e salários',
                category: 'FUTURO COMPROMETIDO',
                image: '/images/cut-news-7.jpg',
                text: 'Sindicato da educação mobiliza professores e comunidade escolar contra arrocho orçamentário.'
              })}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Desktop (PC): Imagem em cima, texto embaixo */}
              <div className="hidden md:flex md:flex-col justify-between h-full p-5">
                <div>
                  <div className="h-40 -mx-5 -mt-5 mb-4 overflow-hidden relative">
                    <img src="/images/cut-news-7.jpg" alt="Matéria" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-amber-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      EDUCAÇÃO
                    </span>
                  </div>
                  <h4 className="font-display font-black text-base text-gray-900 leading-snug group-hover:text-cut-red transition-colors mb-2">
                    Corte orçamentário põe ensino público em risco
                  </h4>
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    Trabalhadores da educação exigem garantia de investimentos e piso salarial.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                  <span>Ver detalhes</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Mobile: Horizontal Estreito */}
              <div className="flex flex-row items-stretch w-full md:hidden">
                <div className="relative w-36 shrink-0 overflow-hidden">
                  <img src="/images/cut-news-7.jpg" alt="Matéria" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-red-50 text-cut-red text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-1.5 block w-fit">
                      EDUCAÇÃO
                    </span>
                    <h4 className="font-display font-black text-sm text-cut-red leading-snug mb-1 line-clamp-2">
                      Corte orçamentário põe ensino público em risco
                    </h4>
                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                      Trabalhadores da educação exigem garantia de investimentos e piso salarial.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cut-red">
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BOTÃO VER MAIS MATÉRIAS */}
          <div className="flex justify-center">
            <button 
              onClick={() => alert("Carregando mais matérias do Portal CUT...")}
              className="magnetic-btn bg-white hover:bg-cut-red text-cut-red hover:text-white border-2 border-cut-red font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              Ver Mais Matérias <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SEÇÃO MULTIMÍDIA E CEDOC NA HOME (IMAGENS BEM MAIORES E IMPONETES) */}
        {/* ------------------------------------------------------------- */}
        <section id="multimedia" className="my-16 rounded-[2.5rem] cedoc-archive-bg text-white p-8 md:p-12 shadow-2xl relative border border-red-900/60">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6 relative z-10">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-['Montserrat'] font-extralight italic tracking-tight text-white leading-tight">
                lembrar das lutas, <span className="font-normal not-italic text-white/95">lutar sempre.</span>
              </h2>
            </div>

            <button 
              onClick={() => alert("Abrindo o portal completo do CEDOC CUT...")}
              className="magnetic-btn bg-amber-400 text-black hover:bg-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider shadow-xl shadow-amber-400/20 flex items-center gap-2 transition-all shrink-0"
            >
              Acessar Portal CEDOC <ChevronRight size={16} />
            </button>
          </div>

          {/* GALERIA FOCADA 100% NAS MÍDIAS HISTÓRICAS DO CEDOC (IMAGENS CINEMATOGRÁFICAS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {multimediaItems.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group relative h-[420px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/20 hover:border-amber-400 shadow-2xl transition-all duration-700 cursor-pointer flex flex-col justify-end"
              >
                {/* Imagem em Destaque Absoluto ocupando 100% da caixa */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out brightness-90 group-hover:brightness-100" 
                />
                
                {/* Overlay Cinematográfico */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 group-hover:via-black/20 transition-all duration-700"></div>

                {/* Badge de Categoria no Topo */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                  <span className="bg-amber-400 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full font-mono shadow-xl tracking-wider">
                    {item.category}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
                    <Play size={12} fill="#FBBF24" /> {item.year}
                  </span>
                </div>

                {/* Botão Flutuante de Play de Alto Destaque no Centro */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-amber-400/90 text-black flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                    <Play size={24} fill="#000" className="ml-1" />
                  </div>
                </div>

                {/* Conteúdo com Tipografia Limpa e Foco na Mídia */}
                <div className="p-6 relative z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[11px] font-mono font-bold text-amber-300/90 uppercase mb-1 tracking-widest">
                    REGISTRO HISTÓRICO • {item.duration}
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors leading-tight mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono pt-2 opacity-90 group-hover:opacity-100">
                    <span>Ampliar Imagem / Mídia</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 4. ESTADUAIS & RAMOS */}
        <section id="estaduais" className="py-12 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 text-cut-red font-bold text-xs uppercase tracking-widest mb-1">
                    <MapPin size={16} /> 📍 Presença & Mobilização em Todo o Brasil
                  </div>
                  <h3 className="text-2xl font-display font-black">CUT <span className="text-cut-red">Estaduais ✊ (27 UFs)</span></h3>
                </div>
                <div className="relative w-40">
                  <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Buscar UF..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-100 pl-8 pr-3 py-1.5 rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-cut-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6 max-h-48 overflow-y-auto pr-1">
                {estaduais
                  .filter(e => e.nome.toLowerCase().includes(searchTerm.toLowerCase()) || e.uf.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(e => (
                    <button 
                      key={e.uf}
                      onClick={() => setSelectedEstado(e.uf)}
                      className={`py-2 rounded-xl font-bold text-xs transition-all ${selectedEstado === e.uf ? 'bg-cut-red text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {e.uf}
                    </button>
                ))}
              </div>

              {estaduais.find(e => e.uf === selectedEstado) && (
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-black text-lg text-gray-900 flex items-center gap-1.5">
                      <span>🏛️</span> CUT {estaduais.find(e => e.uf === selectedEstado).nome} ({selectedEstado})
                    </div>
                    <span className="bg-red-100 text-cut-red text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span>🤝</span> {estaduais.find(e => e.uf === selectedEstado).sindicatos} Sindicatos Filiados
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    Presidente Estadual: <strong className="text-gray-800">{estaduais.find(e => e.uf === selectedEstado).presidente}</strong>
                  </div>
                  <button 
                    onClick={() => alert(`Acessando portal regional CUT-${selectedEstado}...`)}
                    className="text-cut-red text-xs font-bold hover:underline flex items-center gap-1"
                  >
                    Acessar Portal Regional CUT-{selectedEstado} <ExternalLink size={12} />
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div id="ramos" className="flex items-center gap-2 text-cut-red font-bold text-xs uppercase tracking-widest mb-2">
                <Layers size={16} /> 🛠️ Organização por Categorias
              </div>
              <h3 className="text-2xl font-display font-black mb-6">Ramos de Atuação <span className="text-cut-red">✊</span></h3>
              
              <div className="grid grid-cols-2 gap-3">
                {ramos.map((r, i) => {
                  const Icone = r.icone;
                  return (
                    <div key={i} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-cut-red transition-all flex flex-col justify-between">
                      <div className={`w-7 h-7 rounded-lg ${r.cor} text-white flex items-center justify-center mb-2`}>
                        <Icone size={14} />
                      </div>
                      <div>
                        <div className="font-black text-xs text-gray-900">{r.nome}</div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">{r.setor}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* 5. ÁREA DE SERVIÇOS DO TRABALHADOR */}
        <section id="servicos" className="py-12 border-t border-gray-200">
          <div className="bg-gradient-to-r from-cut-dark to-gray-900 text-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cut-red/20 text-cut-red border border-cut-red/40 flex items-center justify-center mb-4 text-xl">
                    💳
                  </div>
                  <h3 className="font-display font-black text-xl mb-2 flex items-center gap-2">
                    Emissão de Boletos <span>📄</span>
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Portal de emissão de guias e contribuição sindical para entidades filiadas.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Portal de Guia de Boleto Sindical ativado.")}
                  className="mt-6 w-full bg-cut-red text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span>✊</span> Gerar Boleto
                </button>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mb-4 text-xl">
                    ✉️
                  </div>
                  <h3 className="font-display font-black text-xl mb-2 flex items-center gap-2">
                    Webmail Institucional <span>💼</span>
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Acesso exclusivo ao e-mail corporativo de dirigentes e secretarias.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Redirecionando para o login do Webmail da CUT.")}
                  className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>🔐</span> Acessar Webmail
                </button>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4 text-xl">
                    📚
                  </div>
                  <h3 className="font-display font-black text-xl mb-2 flex items-center gap-2">
                    Biblioteca & Resoluções <span>📜</span>
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Acervo de documentos oficiais, teses de congressos e estatutos vigentes.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Abrindo o catálogo da Biblioteca Digital CUT.")}
                  className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>🔍</span> Consultar Acervo
                </button>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* MODAL INTERATIVO */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-cut-dark rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-cut-red transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative h-64 w-full">
              <img src={activeModalItem.image} alt={activeModalItem.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <span className="absolute bottom-4 left-6 bg-cut-red text-white text-xs font-black uppercase px-3 py-1 rounded-full font-mono">
                {activeModalItem.category}
              </span>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-display font-black mb-4 leading-tight">
                {activeModalItem.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {activeModalItem.text || activeModalItem.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs font-bold">
                <span className="text-gray-400">CEDOC CUT • Documento Registrado</span>
                <button 
                  onClick={() => setActiveModalItem(null)}
                  className="bg-cut-red text-white px-6 py-2.5 rounded-full uppercase tracking-wider"
                >
                  Fechar Ficha
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-cut-dark text-white pt-16 pb-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div>
            <div className="font-display font-black text-3xl text-cut-red mb-3">CUT BRASIL</div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Central Única dos Trabalhadores. A maior central sindical da América Latina e a quinta maior do mundo.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest text-cut-red">Navegação</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#noticias" className="hover:text-white">Notícias</a></li>
              <li><a href="#campanhas" className="hover:text-white">Campanhas</a></li>
              <li><a href="#multimedia" className="hover:text-white">Multimídia / CEDOC</a></li>
              <li><a href="#estaduais" className="hover:text-white">CUT Estaduais</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest text-cut-red">Serviços</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#servicos" className="hover:text-white">Emissão de Boletos</a></li>
              <li><a href="#servicos" className="hover:text-white">Webmail Institucional</a></li>
              <li><a href="#servicos" className="hover:text-white">Biblioteca de Resoluções</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest text-cut-red">Redes Sociais</h4>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full font-mono text-xs text-emerald-400 border border-white/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              PORTAL.STATUS: ONLINE
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-xs text-gray-500 font-mono">
          © 2026 Central Única dos Trabalhadores - Acervo CEDOC & Preservação Histórica.
        </div>
      </footer>
    </div>
  );
}
