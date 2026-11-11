import { useEffect, useState, useRef, useMemo } from 'react';
import {
  Menu, X, Play, ChevronRight, ChevronLeft, MapPin, Layers,
  CreditCard, Mail, BookOpen, Users, Globe, ExternalLink, ArrowRight,
  ShieldCheck, Search, Sparkles, Accessibility, Share2, Phone, TrendingUp,
  Flame, Send, Plus, Minus, Contrast, RotateCcw, Film,
  Heart, MessageCircle, Volume2, VolumeX, Pause, ChevronUp, ChevronDown,
  Clock, Bookmark, Eye, Info, Check, ThumbsUp, Sun, Moon, TrendingDown
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* DADOS ORIGINAIS PRESERVADOS INTEGRALMENTE                          */
/* ------------------------------------------------------------------ */

const estaduais = [
  { uf: 'AC', nome: 'Acre', regiao: 'Norte', presidente: 'Edmilson Araújo', sindicatos: 45 },
  { uf: 'AL', nome: 'Alagoas', regiao: 'Nordeste', presidente: 'Luciano Silva', sindicatos: 82 },
  { uf: 'AM', nome: 'Amazonas', regiao: 'Norte', presidente: 'Valdemir Santana', sindicatos: 110 },
  { uf: 'AP', nome: 'Amapá', regiao: 'Norte', presidente: 'Nalha Amapá', sindicatos: 38 },
  { uf: 'BA', nome: 'Bahia', regiao: 'Nordeste', presidente: 'Leninha Valente', sindicatos: 195 },
  { uf: 'CE', nome: 'Ceará', regiao: 'Nordeste', presidente: 'Luma Andrade', sindicatos: 140 },
  { uf: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', presidente: 'Rodrigo Rodrigues', sindicatos: 95 },
  { uf: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', presidente: 'Clemilde Cortes', sindicatos: 88 },
  { uf: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', presidente: 'Flávio Silva', sindicatos: 105 },
  { uf: 'MA', nome: 'Maranhão', regiao: 'Nordeste', presidente: 'Arnaldo Gonçalves', sindicatos: 130 },
  { uf: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', presidente: 'Jairo Nogueira', sindicatos: 220 },
  { uf: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', presidente: 'Vilson Gimenes', sindicatos: 75 },
  { uf: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', presidente: 'Henrique Lopes', sindicatos: 90 },
  { uf: 'PA', nome: 'Pará', regiao: 'Norte', presidente: 'Vera Paoloni', sindicatos: 160 },
  { uf: 'PB', nome: 'Paraíba', regiao: 'Nordeste', presidente: 'Tião Santos', sindicatos: 85 },
  { uf: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', presidente: 'Paulo Rocha', sindicatos: 150 },
  { uf: 'PI', nome: 'Piauí', regiao: 'Nordeste', presidente: 'Paulo Bezerra', sindicatos: 70 },
  { uf: 'PR', nome: 'Paraná', regiao: 'Sul', presidente: 'Márcio Kieller', sindicatos: 175 },
  { uf: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', presidente: 'Sandro Cezar', sindicatos: 180 },
  { uf: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', presidente: 'Eliane Bandeira', sindicatos: 65 },
  { uf: 'RO', nome: 'Rondônia', regiao: 'Norte', presidente: 'Elisabeth Leite', sindicatos: 50 },
  { uf: 'RR', nome: 'Roraima', regiao: 'Norte', presidente: 'Chico de Assis', sindicatos: 30 },
  { uf: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', presidente: 'Amarildo Cenci', sindicatos: 210 },
  { uf: 'SC', nome: 'Santa Catarina', regiao: 'Sul', presidente: 'Anna Julia Johnston', sindicatos: 145 },
  { uf: 'SE', nome: 'Sergipe', regiao: 'Nordeste', presidente: 'Roberto Silva', sindicatos: 60 },
  { uf: 'SP', nome: 'São Paulo', regiao: 'Sudeste', presidente: 'Raimundo Suzart', sindicatos: 340 },
  { uf: 'TO', nome: 'Tocantins', regiao: 'Norte', presidente: 'José Roque', sindicatos: 40 },
];

const regioes = ['Todas', 'Sudeste', 'Nordeste', 'Sul', 'Norte', 'Centro-Oeste'];

const ramos = [
  { nome: 'Confetam', setor: 'Municipais', icone: Users, cor: 'from-blue-600 to-blue-900', textCor: 'text-blue-400' },
  { nome: 'CNTE', setor: 'Educação', icone: BookOpen, cor: 'from-emerald-600 to-emerald-950', textCor: 'text-emerald-400' },
  { nome: 'Contraf-CUT', setor: 'Bancários', icone: CreditCard, cor: 'from-amber-600 to-amber-950', textCor: 'text-amber-400' },
  { nome: 'CNM-CUT', setor: 'Metalúrgicos', icone: Layers, cor: 'from-red-600 to-red-950', textCor: 'text-red-400' },
  { nome: 'CNTRTT', setor: 'Transportes', icone: Globe, cor: 'from-purple-600 to-purple-950', textCor: 'text-purple-400' },
  { nome: 'CNTV', setor: 'Vigilantes', icone: ShieldCheck, cor: 'from-indigo-600 to-indigo-950', textCor: 'text-indigo-400' },
];

const multimediaItems = [
  {
    id: 'm1', category: 'Fotografia', title: 'Congresso de Fundação da CUT (1983)',
    year: '1983', duration: 'Galeria', image: '/images/conclat-1983-fundacao.jpg',
    description: 'Plenária com 5.059 delegados e delegadas fundando a Central Única dos Trabalhadores no Pavilhão do Vera Cruz em São Bernardo do Campo.'
  },
  {
    id: 'm2', category: 'Vídeo Histórico', title: 'Primeiro Conclat: A Fundação da CUT',
    year: '1983', duration: 'Documentário', image: '/images/conclat-1983-delegados.jpg',
    description: 'Filme gravado em agosto de 1983 retratando a infraestrutura, os debates políticos e a organização dos delegados fundadores.'
  },
  {
    id: 'm3', category: 'Memória', title: '10º CONCUT: Desenvolvimento com Renda e Direitos',
    year: '2009', duration: 'Identidade Visual', image: '/images/10concut-2009.jpg',
    description: 'Marca oficial e identidade visual do 10º Congresso Nacional da CUT (Congresso José Olívio).'
  },
];

const destaque = {
  id: 'd1', category: 'VITÓRIA HISTÓRICA',
  chapeu: 'ORIGINAL CUT • ESPECIAL ELEIÇÕES',
  image: '/images/cut-atual-1.jpg',
  title: 'A esperança venceu com a energia das ruas para construir o futuro. Obrigado, Lula!',
  text: 'Com a força da mobilização popular nas ruas e nas redes, Lula é reeleito e chega ao quarto mandato. A CUT celebra a vitória da classe trabalhadora e da democracia.',
  resumo: 'Com a força da mobilização popular, Lula é reeleito para o quarto mandato. CUT celebra a vitória da classe trabalhadora e da democracia.',
  duracao: '3 min de leitura',
  relevancia: '99% relevante',
  ano: '2026'
};

const destaquesSlider = [
  {
    id: 'd1',
    category: 'VITÓRIA HISTÓRICA',
    chapeu: 'ESPECIAL ELEIÇÕES',
    image: '/images/cut-atual-1.jpg',
    title: 'A esperança venceu com a energia das ruas para construir o futuro. Obrigado, Lula!',
    text: 'Com a força da mobilização popular nas ruas e nas redes, Lula é reeleito e chega ao quarto mandato. A CUT celebra a vitória da classe trabalhadora e da democracia.',
    resumo: 'Com a força da mobilização popular, Lula é reeleito para o quarto mandato. CUT celebra a vitória da classe trabalhadora e da democracia.',
  },
  {
    id: 's1',
    category: 'BANHO DE DEMOCRACIA',
    chapeu: 'CENÁRIO INTERNACIONAL',
    image: '/images/cut-atual-2.png',
    title: 'Reeleição de Lula repercute entre líderes mundiais e na imprensa internacional',
    text: 'Chefes de Estado e os principais veículos estrangeiros destacam a vitória de Lula como um "banho de democracia" no Brasil.',
    resumo: 'Chefes de Estado e os principais veículos estrangeiros destacam a vitória de Lula como um "banho de democracia".',
  },
  {
    id: 's2',
    category: 'É CRIME!',
    chapeu: 'DENÚNCIA URGENTE',
    image: '/images/cut-atual-3.jpg',
    title: 'MPT recebe 437 denúncias de assédio após eleições; órgão processa deputada do PL',
    text: 'Ministério Público do Trabalho intensifica a apuração de casos de assédio eleitoral e move ação contra parlamentar do PL.',
    resumo: 'Ministério Público do Trabalho intensifica a apuração de casos de assédio eleitoral e processa deputada.',
  },
  {
    id: 'l5',
    category: 'DIREITOS TRABALHISTAS',
    chapeu: 'FIM DA ESCALA 6x1',
    image: '/images/cut-atual-5.jpg',
    title: 'Fim da escala 6x1: 13 perguntas e respostas sobre o que muda com a nova regra',
    text: 'Tire suas dúvidas sobre a nova jornada de trabalho e os direitos garantidos com a proposta histórica que mobiliza o país.',
    resumo: 'Entenda o que muda na sua jornada com a nova regra pelo fim da escala 6x1.',
  },
];

const secundarias = [
  {
    id: 's1', category: 'BANHO DE DEMOCRACIA',
    chapeu: 'CENÁRIO INTERNACIONAL',
    image: '/images/cut-atual-2.png',
    title: 'Reeleição de Lula repercute entre líderes mundiais e na imprensa internacional',
    text: 'Chefes de Estado e os principais veículos estrangeiros destacam a vitória de Lula como um "banho de democracia" no Brasil.',
    resumo: 'Chefes de Estado e os principais veículos estrangeiros destacam a vitória de Lula como um "banho de democracia".',
    tempo: '2 min',
    ano: '2026'
  },
  {
    id: 's2', category: 'É CRIME!',
    chapeu: 'DENÚNCIA URGENTE',
    image: '/images/cut-atual-3.jpg',
    title: 'MPT recebe 437 denúncias de assédio após eleições; órgão processa deputada do PL',
    text: 'Ministério Público do Trabalho intensifica a apuração de casos de assédio eleitoral e move ação contra parlamentar do PL.',
    resumo: 'Ministério Público do Trabalho intensifica a apuração de casos de assédio eleitoral e processa deputada.',
    tempo: '4 min',
    ano: '2026'
  },
];

const relacionadas = [
  { id: 'r1', category: 'ELEIÇÕES 2026', image: '/images/cut-news-1.png', title: 'Nas ruas e nas redes, juventude defende a democracia', text: 'Mobilização de jovens marcou a reta final da campanha em todo o país.', tempo: '2 min' },
  { id: 'r2', category: 'ELEIÇÕES 2026', image: '/images/cut-news-2.jpg', title: 'Centrais sindicais preparam pauta para o novo mandato', text: 'Emprego, renda e fim da escala 6x1 estão entre as prioridades.', tempo: '3 min' },
  { id: 'r3', category: 'ELEIÇÕES 2026', image: '/images/cut-news-3.jpg', title: 'Assédio eleitoral: como denunciar e se proteger', text: 'Canais do MPT e da CUT recebem denúncias de trabalhadores e trabalhadoras.', tempo: '3 min' },
];

const linhaMaterias = [
  {
    id: 'l4', category: 'PORTUÁRIOS NA LUTA', image: '/images/cut-atual-4.jpeg',
    title: 'Portuários se mobilizam por empregos, direitos e paz em ação internacional',
    resumo: 'Categoria se une em ação global pelo trabalho decente.',
    text: 'Trabalhadores portuários de vários países realizam ação conjunta em defesa do emprego, dos direitos e da paz.',
    tempo: '3 min'
  },
  {
    id: 'l5', category: 'TIRE SUAS DÚVIDAS', image: '/images/cut-atual-5.jpg',
    title: 'Fim da escala 6x1: 13 perguntas e respostas sobre o que muda com a nova regra',
    resumo: 'Entenda o que muda na sua jornada com a nova regra.',
    text: 'Tire suas dúvidas sobre a nova jornada de trabalho e os direitos garantidos com o fim da escala 6x1.',
    tempo: '5 min'
  },
  {
    id: 'l6', category: 'LEI DO GOVERNO LULA', image: '/images/cut-atual-6.jpg',
    title: 'Sancionada lei que perdoa dívida e aumenta limite de MEI',
    resumo: 'Microempreendedores ganham renegociação e teto maior.',
    text: 'Nova lei do governo Lula beneficia microempreendedores individuais com perdão de dívidas e teto de faturamento maior.',
    tempo: '2 min'
  },
  {
    id: 'l7', category: 'BRASIL PROFUNDO', image: '/images/cut-atual-7.jpg',
    title: 'Cortes em benefícios sociais podem derrubar renda, emprego e arrecadação no interior',
    resumo: 'Impacto atinge a economia dos pequenos municípios.',
    text: 'Estudo mostra que cortes em programas sociais afetam diretamente a economia dos pequenos municípios do Brasil profundo.',
    tempo: '4 min'
  },
];

const carrosselNoticias = [
  { id: 'c1', category: 'TRANSPORTE', image: '/images/cut-news-4.jpg', title: 'Governo envia ao Congresso proposta de tarifa zero no transporte', text: 'Proposta prevê financiamento federal para o transporte coletivo urbano.', tempo: '2 min' },
  { id: 'c2', category: 'DIREITOS', image: '/images/cut-news-5.jpg', title: 'Pacotaço de 200 decretos ameaça direitos trabalhistas', text: 'Entidades sindicais alertam para o risco de retrocessos na legislação.', tempo: '3 min' },
  { id: 'c3', category: 'JORNADA', image: '/images/cut-news-6.jpg', title: 'Fim da escala 6x1: entenda o que muda', text: 'Veja como ficam jornada, salário e descanso semanal.', tempo: '4 min' },
  { id: 'c4', category: 'JUVENTUDE', image: '/images/cut-news-7.jpg', title: 'Juventude trabalhadora ocupa as ruas pela democracia', text: 'Atos reuniram milhares de jovens em capitais de todo o país.', tempo: '5 min' },
  { id: 'c5', category: 'EMPREGO', image: '/images/cut-atual-3.jpg', title: 'Mercado de trabalho tem melhor resultado em uma década', text: 'Geração de empregos formais segue em ritmo de crescimento.', tempo: '6 min' },
  { id: 'c6', category: 'SAÚDE', image: '/images/cut-atual-6.jpg', title: 'Trabalhadores da saúde cobram piso e valorização', text: 'Categoria realiza jornada nacional de lutas.', tempo: '7 min' },
];

const maisLidas = [
  { n: 1, title: 'Fim da escala 6x1: 13 perguntas e respostas sobre o que muda', category: 'TIRE SUAS DÚVIDAS', image: '/images/cut-atual-5.jpg', text: destaque.text },
  { n: 2, title: 'Obrigado, Lula! A esperança venceu com a energia das ruas', category: 'VITÓRIA HISTÓRICA', image: '/images/cut-atual-1.jpg', text: destaque.text },
  { n: 3, title: 'MPT recebe 437 denúncias de assédio após eleições', category: 'É CRIME!', image: '/images/cut-atual-3.jpg', text: secundarias[1].text },
  { n: 4, title: 'Sancionada lei que perdoa dívida e aumenta limite de MEI', category: 'LEI DO GOVERNO LULA', image: '/images/cut-atual-6.jpg', text: linhaMaterias[2].text },
  { n: 5, title: 'Pacotaço de 200 decretos ameaça direitos trabalhistas', category: 'DIREITOS', image: '/images/cut-news-5.jpg', text: carrosselNoticias[1].text },
];

const indicadoresDieese = [
  { label: 'Salário mínimo', valor: 'R$ 1.621,00', var: 'vigente' },
  { label: 'Mínimo necessário', valor: 'R$ 7.067,18', var: '+0,8% no mês' },
  { label: 'Cesta básica (SP)', valor: 'R$ 842,30', var: '-1,2% no mês' },
  { label: 'INPC', valor: '0,34%', var: 'mensal' },
  { label: 'Desemprego', valor: '5,6%', var: 'menor da série' },
];

const videosCurtos = [
  { id: 'v1', tag: 'Direitos', duration: '0:15', title: 'Fim da 6x1 em 60 segundos', image: '/images/cut-atual-5.jpg', caption: 'Entenda em poucos segundos o que muda na sua jornada com o fim da escala 6x1. #6x1 #CUT' },
  { id: 'v2', tag: 'Democracia', duration: '0:15', title: 'Juventude nas ruas pela democracia', image: '/images/cut-news-1.png', caption: 'Nas ruas e nas redes, a juventude trabalhadora defende a democracia. #Democracia #CUT' },
  { id: 'v3', tag: 'Denuncie', duration: '0:15', title: 'Você sabe o que é assédio eleitoral?', image: '/images/cut-atual-3.jpg', caption: 'Assédio eleitoral é crime. Saiba como identificar e onde denunciar. #ÉCrime' },
  { id: 'v4', tag: 'Memória', duration: '0:15', title: 'Memória: o Conclat de 1983', image: '/images/conclat-1983-delegados.jpg', caption: 'Os 5.059 delegados que fundaram a CUT em São Bernardo do Campo. #Memória' },
  { id: 'v5', tag: 'Explica', duration: '0:15', title: 'Tarifa zero: como funciona', image: '/images/cut-news-4.jpg', caption: 'Como a proposta de tarifa zero pode mudar a vida de quem depende do transporte. #TarifaZero' },
];

const parceiros = [
  {
    sigla: 'DIEESE',
    nome: 'Departamento Intersindical de Estatística e Estudos Socioeconômicos',
    categoria: 'Pesquisas & Estatísticas',
    desc: 'Estudos socioeconômicos, índices de inflação e pesquisas para fortalecer as negociações da classe trabalhadora.',
    url: 'https://www.dieese.org.br',
    logo: '/images/parceiros/dieese_norm.png'
  },
  {
    sigla: 'DIAP',
    nome: 'Departamento Intersindical de Assessoria Parlamentar',
    categoria: 'Assessoria Parlamentar',
    desc: 'Acompanhamento analítico e monitoramento de projetos e votações de interesse dos trabalhadores no Congresso.',
    url: 'https://www.diap.org.br',
    logo: '/images/parceiros/diap_norm.png'
  },
  {
    sigla: 'MPT',
    nome: 'Ministério Público do Trabalho',
    categoria: 'Direitos Trabalhistas',
    desc: 'Defesa da ordem jurídica trabalhista, combate ao trabalho análogo à escravidão e garantia dos direitos coletivos.',
    url: 'https://www.prt2.mpt.mp.br',
    logo: '/images/parceiros/mpt_norm.png'
  },
  {
    sigla: 'IndustriALL',
    nome: 'IndustriALL Global Union',
    categoria: 'Solidariedade Internacional',
    desc: 'Federação sindical global de 50 milhões de trabalhadores em 140 países na luta industrial e sindical.',
    url: 'https://www.industriall-union.org',
    logo: '/images/parceiros/industriaal_norm.png'
  },
];

const redesSociais = [
  { id: 'instagram', nome: 'Instagram', url: 'https://www.instagram.com/cutbrasil' },
  { id: 'facebook', nome: 'Facebook', url: 'https://www.facebook.com/cutbrasil' },
  { id: 'x', nome: 'X', url: 'https://x.com/cut_brasil' },
  { id: 'youtube', nome: 'YouTube', url: 'https://www.youtube.com/@cutbrasil' },
  { id: 'tiktok', nome: 'TikTok', url: 'https://www.tiktok.com/@cutbrasil' },
  { id: 'whatsapp', nome: 'WhatsApp', url: 'https://www.whatsapp.com/channel/cutbrasil' },
  { id: 'telegram', nome: 'Telegram', url: 'https://t.me/cutbrasil' },
];

const idiomas = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
];

/* ------------------------------------------------------------------ */
/* COMPONENTES DE STREAMING RESPONSIVOS                                */
/* ------------------------------------------------------------------ */

const SocialGlyph = ({ id, size = 14 }) => {
  const paths = {
    instagram: 'M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.9a5.9 5.9 0 100 11.8 5.9 5.9 0 000-11.8zm0 9.7a3.8 3.8 0 110-7.6 3.8 3.8 0 010 7.6zm6.1-10a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z',
    facebook: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z',
    x: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z',
    youtube: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z',
    tiktok: 'M19.6 6.7a4.8 4.8 0 01-3.8-4.2V2h-3.4v13.4a2.9 2.9 0 11-2.9-2.9c.3 0 .6 0 .8.1V9.2a6.3 6.3 0 00-.8-.1 6.3 6.3 0 106.3 6.3V8.6a8.2 8.2 0 004.8 1.5V6.8c-.4 0-.7 0-1-.1z',
    whatsapp: 'M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 01-5-1.4l-3.6.9 1-3.5A9.8 9.8 0 1112 21.8zM12 0A12 12 0 001.6 18L0 24l6.2-1.6A12 12 0 1012 0z',
    telegram: 'M23.9 3.6l-3.6 17c-.3 1.2-1 1.5-2 .9l-5.5-4-2.6 2.5c-.3.3-.5.5-1.1.5l.4-5.600 10.200-9.200c.4-.4-.1-.6-.7-.2L6.400 13.400.9 11.700c-1.200-.4-1.200-1.200.3-1.800l21.400-8.200c1-.4 1.900.2 1.300 1.900z',
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={paths[id]} />
    </svg>
  );
};

/* Modal de Leitura / Player de Conteúdo */
const StreamingModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[95] bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#181818] text-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative my-auto border border-white/10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Fechar" className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-cut-red text-white flex items-center justify-center transition-colors">
          <X size={20} />
        </button>

        <div className="relative aspect-[16/9] w-full bg-black">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:left-8 right-4">
            <span className="bg-cut-red text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded mb-1.5 inline-block font-mono">
              {item.category}
            </span>
            <h2 className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white leading-tight">
              {item.title}
            </h2>
          </div>
        </div>

        <div className="p-4 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-gray-400">
            <span className="text-emerald-400 font-bold">98% Relevante</span>
            <span>2026</span>
            <span className="border border-white/20 px-1.5 py-0.5 rounded text-[9px]">HD</span>
            <span className="border border-white/20 px-1.5 py-0.5 rounded text-[9px]">CUT ORIGINAL</span>
            <span>{item.tempo || item.duration || 'Notícia Oficial'}</span>
          </div>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            {item.text || item.description || item.resumo}
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button onClick={() => alert('Matéria adicionada à sua lista!')} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10">
                <Plus size={16} />
              </button>
              <button onClick={() => alert('Gostei registrado!')} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10">
                <ThumbsUp size={14} />
              </button>
            </div>
            <button onClick={onClose} className="bg-cut-red hover:bg-white hover:text-cut-red text-white px-5 py-2 rounded text-xs font-black uppercase tracking-wider transition-colors">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Player Shorts estilo Reels */
const VIDEO_DURATION_MS = 15000;
const ShortPlayerModal = ({ videos, index, onChange, onClose }) => {
  const v = videos[index];
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => { setProgress(0); setLiked(false); setPlaying(true); }, [index]);

  useEffect(() => {
    if (!playing) return undefined;
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / (VIDEO_DURATION_MS / 100);
        if (next >= 100) {
          if (index < videos.length - 1) onChange(index + 1);
          return 0;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(t);
  }, [playing, index, videos.length, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' && index < videos.length - 1) onChange(index + 1);
      if (e.key === 'ArrowUp' && index > 0) onChange(index - 1);
      if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, videos.length, onChange, onClose]);

  const secs = Math.round((progress / 100) * (VIDEO_DURATION_MS / 1000));
  const total = VIDEO_DURATION_MS / 1000;
  const fmt = (s) => `0:${String(s).padStart(2, '0')}`;

  return (
    <div className="shorts-player fixed inset-0 z-[95] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 select-none" onClick={onClose}>
      <button onClick={onClose} aria-label="Fechar" className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-cut-red text-white flex items-center justify-center transition-colors">
        <X size={22} />
      </button>

      <div className="hidden sm:flex absolute right-6 lg:right-[calc(50%-18rem)] top-1/2 -translate-y-1/2 z-30 flex-col gap-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onChange(index - 1)} disabled={index === 0} aria-label="Anterior" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-20 text-white flex items-center justify-center">
          <ChevronUp size={22} />
        </button>
        <button onClick={() => onChange(index + 1)} disabled={index === videos.length - 1} aria-label="Próximo" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-20 text-white flex items-center justify-center">
          <ChevronDown size={22} />
        </button>
      </div>

      <div
        className="relative w-full h-full sm:w-auto sm:h-[min(88vh,780px)] sm:aspect-[9/16] sm:rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl"
        onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }}
        onTouchStart={(e) => { e.currentTarget.dataset.y = e.touches[0].clientY; }}
        onTouchEnd={(e) => {
          const dy = e.changedTouches[0].clientY - Number(e.currentTarget.dataset.y);
          if (dy < -60 && index < videos.length - 1) onChange(index + 1);
          if (dy > 60 && index > 0) onChange(index - 1);
        }}
      >
        <div className="absolute inset-0 will-change-transform" style={{ transform: `translateY(-${index * 100}%)`, transition: 'transform 450ms cubic-bezier(0.2, 1, 0.3, 1)' }}>
          {videos.map((x, i) => (
            <div key={x.id} className="absolute inset-x-0 h-full overflow-hidden bg-black" style={{ top: `${i * 100}%` }}>
              <img src={x.image} alt={x.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
              <div className="absolute top-8 left-4 z-20 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cut-red border border-white flex items-center justify-center text-white text-[10px] font-black">CUT</div>
                <div>
                  <div className="text-white text-xs font-black leading-none">@cutbrasil</div>
                  <div className="text-white/70 text-[9px] font-mono">{x.tag}</div>
                </div>
              </div>
              <div className="absolute bottom-20 inset-x-0 px-5 pr-16 z-20">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                  #{x.tag} • Shorts da CUT
                </span>
                <h3 className="shorts-player-title font-display font-black text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2.5 text-white drop-shadow-xl">
                  {x.title}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-3 drop-shadow">
                  {x.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-3 inset-x-3 flex gap-1 z-30">
          {videos.map((x, i) => (
            <div key={x.id} className="h-1 flex-1 rounded bg-white/30 overflow-hidden">
              <div className="h-full bg-white" style={{ width: i < index ? '100%' : i === index ? `${progress}%` : '0%' }} />
            </div>
          ))}
        </div>

        <button onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }} className="absolute top-8 right-4 z-30 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center">
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center">
              <Play size={24} fill="#fff" className="ml-1 text-white" />
            </div>
          </div>
        )}

        <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4 text-white" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setLiked((l) => !l)} className="flex flex-col items-center gap-0.5" aria-label="Curtir">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center ${liked ? 'bg-cut-red' : 'bg-black/50'}`}>
              <Heart size={18} fill={liked ? '#fff' : 'none'} />
            </span>
            <span className="text-[9px] font-bold">12k</span>
          </button>
          <button className="flex flex-col items-center gap-0.5" aria-label="Comentários">
            <span className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"><MessageCircle size={18} /></span>
            <span className="text-[9px] font-bold">348</span>
          </button>
          <button className="flex flex-col items-center gap-0.5" aria-label="Compartilhar">
            <span className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"><Share2 size={18} /></span>
            <span className="text-[9px] font-bold">Enviar</span>
          </button>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-4 pr-16 z-30">
          <div className="flex items-center justify-between text-[9px] text-white/70 font-mono mb-1">
            <span>{fmt(secs)}</span><span>{fmt(total)}</span>
          </div>
          <div className="h-1 rounded bg-white/20 overflow-hidden">
            <div className="h-full bg-cut-red" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Card de Streaming Responsivo e Otimizado */
const StreamingCard = ({ item, onOpen, className = '' }) => (
  <div
    onClick={() => onOpen(item)}
    className={`group relative shrink-0 snap-start cursor-pointer rounded-lg overflow-hidden bg-[#1c1c1c] border border-white/5 hover:border-cut-red hover:scale-105 hover:z-20 transition-all duration-300 shadow-md flex flex-col justify-between ${
      className || 'w-[82vw] xs:w-[68vw] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]'
    }`}
  >
    <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent opacity-70" />
      <span className="absolute top-2 left-2 bg-cut-red text-white text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
        {item.category}
      </span>
      {/* Ao passar o mouse: Ler Matéria */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/45 backdrop-blur-[2px]">
        <div className="bg-cut-red text-white text-[11px] font-black uppercase px-3 py-1.5 rounded shadow-xl flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
          <BookOpen size={13} />
          <span>Ler Matéria</span>
        </div>
      </div>
    </div>

    <div className="p-4 bg-[#1c1c1c] transition-colors flex-1 flex flex-col justify-between">
      <div>
        <h4 className="article-card-title font-display font-black text-base sm:text-lg lg:text-[19px] leading-tight line-clamp-2 transition-colors mb-2">
          {item.title}
        </h4>
        <p className="article-card-desc text-xs sm:text-[13px] line-clamp-2 leading-relaxed">
          {item.resumo || item.text}
        </p>
      </div>
      <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span className="text-emerald-500 dark:text-emerald-400 font-bold">98% Relevante</span>
        <span className="text-gray-400">{item.tempo || '3 min'}</span>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* APP PRINCIPAL: STREAMING OTIMIZADO & RESPONSIVO (v2.2)             */
/* ------------------------------------------------------------------ */

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState('SP');
  const [filtroRegiao, setFiltroRegiao] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [iaQuery, setIaQuery] = useState('');
  const [iaAnswer, setIaAnswer] = useState(null);
  const [idioma, setIdioma] = useState('pt');
  const [a11yOpen, setA11yOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [videoIdx, setVideoIdx] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('cut_theme_v22') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const isLight = theme === 'light';
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.classList.toggle('dark', !isLight);
    try {
      localStorage.setItem('cut_theme_v22', theme);
    } catch {}
  }, [theme]);

  const [indicado, setIndicado] = useState(false);
  const [contato, setContato] = useState({ nome: '', email: '', mensagem: '' });
  const [contatoEnviado, setContatoEnviado] = useState(false);

  const [slideIdx, setSlideIdx] = useState(0);
  const [isSlideHovered, setIsSlideHovered] = useState(false);

  useEffect(() => {
    if (isSlideHovered) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % destaquesSlider.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isSlideHovered]);

  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % destaquesSlider.length);
  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + destaquesSlider.length) % destaquesSlider.length);

  const row1Ref = useRef(null);
  const top5Ref = useRef(null);
  const row2Ref = useRef(null);
  const videosRef = useRef(null);

  const [top5CanScrollLeft, setTop5CanScrollLeft] = useState(false);
  const [top5CanScrollRight, setTop5CanScrollRight] = useState(true);

  const checkTop5Scroll = () => {
    if (top5Ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = top5Ref.current;
      setTop5CanScrollLeft(scrollLeft > 15);
      setTop5CanScrollRight(scrollLeft + clientWidth < scrollWidth - 25);
    }
  };

  useEffect(() => {
    const el = top5Ref.current;
    if (!el) return;
    checkTop5Scroll();
    el.addEventListener('scroll', checkTop5Scroll, { passive: true });
    window.addEventListener('resize', checkTop5Scroll);
    return () => {
      el.removeEventListener('scroll', checkTop5Scroll);
      window.removeEventListener('resize', checkTop5Scroll);
    };
  }, []);

  const scrollTrilho = (ref, dir) => {
    if (ref.current) {
      const scrollAmount = Math.max(300, Math.floor(ref.current.clientWidth * 0.75));
      ref.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      setTimeout(checkTop5Scroll, 350);
    }
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  const handleIaSearch = (e) => {
    e.preventDefault();
    const q = iaQuery.trim();
    if (!q) return;
    setIaAnswer(q);
    setIsSearchOpen(false);
  };

  const handleIndicar = async () => {
    const url = window.location.href;
    const data = { title: 'Portal CUT Streaming', text: 'Novo portal da CUT em formato streaming', url };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(url);
      setIndicado(true);
      setTimeout(() => setIndicado(false), 3000);
    } catch { /* cancelado */ }
  };

  const handleContato = (e) => {
    e.preventDefault();
    setContatoEnviado(true);
    setContato({ nome: '', email: '', mensagem: '' });
    setTimeout(() => setContatoEnviado(false), 4000);
  };

  const estadosFiltrados = useMemo(() => {
    return estaduais.filter((e) => {
      const bateRegiao = filtroRegiao === 'Todas' || e.regiao === filtroRegiao;
      const bateBusca = !searchTerm || e.nome.toLowerCase().includes(searchTerm.toLowerCase()) || e.uf.toLowerCase().includes(searchTerm.toLowerCase());
      return bateRegiao && bateBusca;
    });
  }, [filtroRegiao, searchTerm]);

  const estadoSel = estaduais.find((e) => e.uf === selectedEstado);

  return (
    <div className="relative min-h-screen bg-[#141414] text-white font-sans overflow-x-hidden selection:bg-cut-red selection:text-white">

      {/* -------------------------------------------------------------- */}
      {/* 1. HEADER VERMELHO CUT (Com Barra DIEESE no Topo)              */}
      {/* -------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 shadow-xl">
        {/* Faixa DIEESE Minimalista no Topo (Apenas o Essencial) */}
        <aside
          aria-label="Indicadores DIEESE"
          className="dieese-top-bar w-full py-1 text-[10px] sm:text-[11px] font-mono select-none border-b border-black/40"
        >
          <div className="w-full page-gutter flex items-center justify-between sm:justify-start gap-3 sm:gap-5 overflow-x-auto no-scrollbar whitespace-nowrap">
            <a
              href="https://www.dieese.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-[11px] font-mono text-gray-400 hover:text-white transition-colors shrink-0 flex items-center gap-1"
              title="Acessar portal DIEESE"
            >
              <span className="text-gray-400">Fonte:</span>
              <span className="font-bold text-gray-200 hover:text-cut-red transition-colors">DIEESE</span>
            </a>
            <span className="text-white/20 shrink-0">|</span>
            <div className="flex items-center gap-3.5 sm:gap-6 text-gray-300">
              {indicadoresDieese.map((i, idx) => (
                <div key={i.label} className="inline-flex items-center gap-1.5 shrink-0">
                  <span className="text-gray-400">{i.label}:</span>
                  <span className="text-white font-bold">{i.valor}</span>
                  {idx < indicadoresDieese.length - 1 && (
                    <span className="text-white/20 ml-2.5 sm:ml-5">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Barra Principal Vermelha da CUT */}
        <div className="bg-cut-red border-b border-red-700/60">
          <div className="w-full page-gutter h-14 sm:h-16 flex items-center justify-between gap-3">
          
          {/* LADO ESQUERDO: Logo limpo + Menu de Navegação */}
          <div className="flex items-center gap-4 lg:gap-8 min-w-0">
            <a href="#" className="shrink-0 flex items-center" aria-label="CUT Início">
              <img
                src="/images/logo-cut-box.png"
                alt="CUT"
                className="h-8 sm:h-10 md:h-11 w-auto transition-transform hover:scale-105 drop-shadow"
              />
            </a>

            {/* Menu ao lado do Logo (desktop) */}
            <nav className="hidden lg:flex items-center space-x-5 text-xs font-bold text-white/90">
              <a href="#inicio" className="text-white hover:text-black transition-colors">Início</a>
              <a href="#em-alta" className="hover:text-black transition-colors">Em Alta</a>
              <a href="#campanhas" className="hover:text-black transition-colors">Campanhas</a>
              <a href="#dossies" className="hover:text-black transition-colors">Dossiês</a>
              <a href="#shorts" className="hover:text-black transition-colors">Shorts</a>
              <a href="#multimidia" className="hover:text-black transition-colors">Multimídia</a>
              <a href="#estaduais" className="hover:text-black transition-colors">Estaduais</a>
              <a href="#servicos" className="hover:text-black transition-colors">Serviços</a>
            </nav>
          </div>

          {/* LADO DIREITO: Busca com IA + Ações */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Barra de busca Desktop */}
            <form onSubmit={handleIaSearch} className="hidden sm:block relative w-48 md:w-56 lg:w-64" role="search">
              <Sparkles size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cut-red pointer-events-none" />
              <input
                type="text"
                value={iaQuery}
                onChange={(e) => setIaQuery(e.target.value)}
                placeholder="Perguntar à IA da CUT..."
                aria-label="Busca com inteligência artificial"
                className="w-full bg-white text-black placeholder-gray-500 pl-8 pr-7 py-1.5 rounded text-xs font-bold focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button type="submit" aria-label="Buscar" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                <Search size={13} />
              </button>
            </form>

            {/* Botão de busca Mobile (abre barra retrátil) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar no portal"
              className="sm:hidden p-2 text-white hover:text-black"
            >
              <Search size={18} />
            </button>

            {/* Indicar site */}
            <button
              onClick={handleIndicar}
              title="Indicar portal"
              className="hidden md:flex items-center gap-1 text-xs font-bold text-white hover:text-black transition-colors px-1"
            >
              <Share2 size={13} />
              <span>{indicado ? 'Copiado!' : 'Indicar'}</span>
            </button>

            {/* Idioma */}
            <div className="flex items-center gap-1 text-xs text-white">
              <Globe size={13} />
              <select
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
                aria-label="Idioma"
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
              >
                {idiomas.map((i) => (
                  <option key={i.code} value={i.code} className="text-black">{i.code.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Alternador de Tema Claro / Escuro */}
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
              title={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
              className="p-1.5 rounded-full bg-black/25 hover:bg-white hover:text-cut-red text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-amber-300" />
              ) : (
                <Moon size={15} className="text-white" />
              )}
            </button>

            {/* Menu hamburguer mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              className="lg:hidden p-1.5 text-white hover:text-black"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Barra de busca mobile retrátil */}
        {isSearchOpen && (
          <div className="sm:hidden px-4 pb-3 pt-1 border-t border-red-700/60 bg-cut-red animate-fadeIn">
            <form onSubmit={handleIaSearch} className="relative w-full" role="search">
              <Sparkles size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cut-red pointer-events-none" />
              <input
                type="text"
                autoFocus
                value={iaQuery}
                onChange={(e) => setIaQuery(e.target.value)}
                placeholder="Perguntar à IA da CUT..."
                aria-label="Busca com inteligência artificial"
                className="w-full bg-white text-black placeholder-gray-500 pl-9 pr-8 py-2 rounded text-xs font-bold focus:outline-none"
              />
              <button type="submit" aria-label="Buscar" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>

      {/* Menu mobile expansível */}
      {isMenuOpen && (
        <div className="bg-[#181818] border-b border-red-700/50 page-gutter py-4 lg:hidden flex flex-col space-y-3 text-sm font-bold animate-fadeIn">
          <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Início</a>
          <a href="#em-alta" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Em Alta</a>
          <a href="#campanhas" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Campanhas</a>
          <a href="#dossies" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Dossiês</a>
          <a href="#shorts" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Shorts</a>
          <a href="#multimidia" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Multimídia</a>
          <a href="#estaduais" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Estaduais</a>
          <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="hover:text-cut-red">Serviços</a>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span>Tema: {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}</span>
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="px-2.5 py-1 rounded bg-cut-red text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
            >
              {theme === 'dark' ? <Sun size={12} className="text-amber-300" /> : <Moon size={12} />}
              <span>{theme === 'dark' ? 'Ativar Claro' : 'Ativar Escuro'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Resposta de busca com IA */}
      {iaAnswer && (
        <div className="bg-[#202020] border-b border-cut-red page-gutter py-3 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5 text-xs">
            <div className="w-6 h-6 rounded bg-cut-red text-white flex items-center justify-center shrink-0">
              <Sparkles size={13} />
            </div>
            <div>
              <span className="font-bold text-white">IA CUT: Resumo sobre “{iaAnswer}”: </span>
              <span className="text-gray-300">Confira abaixo as matérias oficiais da Central Única dos Trabalhadores.</span>
            </div>
          </div>
          <button onClick={() => setIaAnswer(null)} aria-label="Fechar" className="text-gray-400 hover:text-white p-1">
            <X size={16} />
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* 2. HERO SLIDER CINEMATOGRÁFICO DE DESTAQUES                     */}
      {/* -------------------------------------------------------------- */}
      <section
        id="inicio"
        onMouseEnter={() => setIsSlideHovered(true)}
        onMouseLeave={() => setIsSlideHovered(false)}
        className="relative w-full h-[60vh] sm:h-[68vh] lg:h-[75vh] min-h-[440px] max-h-[720px] overflow-hidden bg-black flex items-end group/slider"
      >
        {/* Slides de Fundo com Transição Suave */}
        {destaquesSlider.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === slideIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className={`w-full h-full object-cover object-center filter brightness-[0.65] transition-transform duration-[6000ms] ease-out ${
                idx === slideIdx ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Gradientes cinematográficos */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/75 to-transparent w-full md:w-3/4 z-10 pointer-events-none" />

        {/* Informações da Manchete do Slide */}
        <div className="relative page-gutter pb-8 sm:pb-12 max-w-4xl z-20 space-y-2.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono">
            <span className="bg-cut-red text-white font-black uppercase px-2.5 py-0.5 rounded shadow tracking-wider">
              {destaquesSlider[slideIdx].chapeu}
            </span>
            <span className="text-gray-400 font-mono text-[11px]">
              Destaque {slideIdx + 1} de {destaquesSlider.length}
            </span>
          </div>

          <h1 className="font-display font-black text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-white leading-tight drop-shadow-lg max-w-3xl transition-all duration-300">
            {destaquesSlider[slideIdx].title}
          </h1>

          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-xl drop-shadow">
            {destaquesSlider[slideIdx].text}
          </p>

          {/* Botão Ler Matéria único (botão detalhes e dados anexos removidos) */}
          <div className="pt-2">
            <button
              onClick={() => setActiveModalItem(destaquesSlider[slideIdx])}
              className="bg-cut-red hover:bg-white hover:text-cut-red text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              <BookOpen size={17} />
              <span>Ler Matéria</span>
            </button>
          </div>
        </div>

        {/* Botões de navegação lateral do Slider */}
        <button
          onClick={prevSlide}
          aria-label="Destaque anterior"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-cut-red text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-300 shadow-xl border border-white/10 hover:scale-110 cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Próximo destaque"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-cut-red text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-300 shadow-xl border border-white/10 hover:scale-110 cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicadores de Barras do Slider no Canto Inferior Direito */}
        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-10 z-30 flex items-center gap-2">
          {destaquesSlider.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIdx(idx)}
              aria-label={`Ir para destaque ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === slideIdx ? 'w-8 sm:w-10 bg-cut-red' : 'w-2.5 sm:w-3 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* 3. FITA TICKER: ÚLTIMAS NOTÍCIAS                               */}
      {/* -------------------------------------------------------------- */}
      <div className="ticker-strip bg-[#1c1c1c] text-white py-1.5 page-gutter overflow-hidden flex items-center gap-3 border-y border-white/10 transition-colors">
        <span className="bg-cut-red text-white font-black px-2.5 py-0.5 text-[9px] uppercase tracking-wider shrink-0 rounded font-mono">
          ÚLTIMAS DA CUT
        </span>
        <div className="overflow-hidden whitespace-nowrap text-gray-300 font-medium w-full text-xs">
          <div className="animate-marquee flex items-center gap-8">
            <span>Lula é reeleito e chega ao quarto mandato • Governo envia ao Congresso proposta de tarifa zero no transporte • Fim da escala 6x1: entenda o que muda • Nas ruas e nas redes, juventude defende a democracia • Pacotaço de 200 decretos ameaça direitos trabalhistas •</span>
            <span>Lula é reeleito e chega ao quarto mandato • Governo envia ao Congresso proposta de tarifa zero no transporte • Fim da escala 6x1: entenda o que muda • Nas ruas e nas redes, juventude defende a democracia • Pacotaço de 200 decretos ameaça direitos trabalhistas •</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* 4. BANNER CAMPANHA NACIONAL                                    */}
      {/* -------------------------------------------------------------- */}
      <section id="campanhas" className="w-full page-gutter py-5">
        <div className="w-full bg-gradient-to-r from-red-950 via-[#200a0b] to-black border border-red-700/50 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-cut-red rounded-lg flex items-center justify-center text-xl shrink-0 shadow">
              ✊
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest block">
                Mobilização Oficial • Gestão 2026
              </span>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-black text-white uppercase tracking-tight">
                Campanha Nacional CUT 2026: Nenhum Direito a Menos!
              </h3>
            </div>
          </div>
          <button
            onClick={() => alert('Baixando kit completo de artes da Campanha CUT 2026...')}
            className="bg-cut-red hover:bg-white hover:text-cut-red text-white px-4 py-2 rounded font-black text-xs uppercase tracking-wider transition-colors shrink-0 font-mono shadow"
          >
            Baixar Material de Redes ↓
          </button>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* 5. TRILHOS HORIZONTAIS DE STREAMING (Otimizados para toque)    */}
      {/* -------------------------------------------------------------- */}
      <main className="w-full page-gutter space-y-10 pb-16">

        {/* TRILHO 1: "EM ALTA AGORA: REPERCUSSÃO ELEITORAL" */}
        <section id="em-alta" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="section-title font-display font-black text-base sm:text-xl flex items-center gap-2">
              <span className="w-1.5 h-4 sm:h-5 bg-cut-red inline-block rounded-full" />
              Em Alta Agora • Repercussão Eleitoral
            </h2>
            <div className="hidden sm:flex items-center gap-1.5">
              <button onClick={() => scrollTrilho(row1Ref, 'left')} aria-label="Voltar" className="w-7 h-7 rounded-full bg-white/10 hover:bg-cut-red flex items-center justify-center transition-colors">
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => scrollTrilho(row1Ref, 'right')} aria-label="Avançar" className="w-7 h-7 rounded-full bg-white/10 hover:bg-cut-red flex items-center justify-center transition-colors">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div ref={row1Ref} className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar scroll-smooth">
            {secundarias.map((s) => (
              <StreamingCard
                key={s.id}
                item={s}
                onOpen={setActiveModalItem}
                className="w-[80vw] xs:w-[68vw] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/2.5)] lg:w-[calc((100%-3.75rem)/3.5)] xl:w-[calc((100%-3.75rem)/3.5)]"
              />
            ))}
            {relacionadas.map((r) => (
              <StreamingCard
                key={r.id}
                item={r}
                onOpen={setActiveModalItem}
                className="w-[80vw] xs:w-[68vw] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/2.5)] lg:w-[calc((100%-3.75rem)/3.5)] xl:w-[calc((100%-3.75rem)/3.5)]"
              />
            ))}
          </div>
        </section>

        {/* TRILHO 2: TOP 5 MAIS LIDAS (ESTILO TOP 10 NETFLIX COM NÚMEROS GIGANTES) */}
        <section className="space-y-3 relative group/top5">
          <div className="flex items-center justify-between">
            <h2 className="section-title font-display font-black text-base sm:text-xl flex items-center gap-2">
              <span className="w-1.5 h-4 sm:h-5 bg-cut-red inline-block rounded-full" />
              Top 5 Mais Lidas da Semana
            </h2>
            <div className="flex items-center gap-1.5 min-w-[70px] justify-end">
              {/* Botão de voltar (aparece após avançar) */}
                {top5CanScrollLeft && (
                  <button
                    onClick={() => scrollTrilho(top5Ref, 'left')}
                    aria-label="Voltar no carrossel Top 5"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-cut-red text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
                    title="Voltar"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}
                {/* Botão de avançar (some ao chegar no 5) */}
                {top5CanScrollRight && (
                  <button
                    onClick={() => scrollTrilho(top5Ref, 'right')}
                    aria-label="Avançar no carrossel Top 5"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-cut-red text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-cut-red/20"
                    title="Avançar"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>

          <div className="relative">
            {/* Botão flutuante lateral esquerdo (só aparece quando pode voltar) */}
            {top5CanScrollLeft && (
              <button
                onClick={() => scrollTrilho(top5Ref, 'left')}
                aria-label="Voltar no carrossel"
                className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-14 sm:w-10 sm:h-20 rounded-r-lg bg-black/85 hover:bg-cut-red text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-2xl border-y border-r border-white/15 cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <div
              ref={top5Ref}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory px-1 touch-pan-x"
            >
              {maisLidas.map((m) => (
                <div
                  key={m.n}
                  onClick={() => setActiveModalItem(m)}
                  className="group shrink-0 flex items-center cursor-pointer hover:scale-105 transition-all duration-300 snap-start select-none w-[78vw] xs:w-[62vw] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/2.5)] lg:w-[calc((100%-3.75rem)/3.5)] xl:w-[calc((100%-3.75rem)/3.5)]"
                >
                  {/* Numeral gigante com FONTE VERMELHA CUT e escala responsiva */}
                  <span className="top5-number text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[11rem] xl:text-[11.5rem] -mr-3 xs:-mr-4 sm:-mr-6 md:-mr-7 lg:-mr-8 z-10 shrink-0 pointer-events-none drop-shadow-xl select-none">
                    {m.n}
                  </span>

                  <div className="relative flex-1 min-w-0 aspect-[3/4] rounded-lg overflow-hidden bg-[#1c1c1c] border border-white/10 shadow-lg">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <span className="bg-cut-red text-white text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded font-mono shadow">
                        TOP {m.n}
                      </span>
                    </div>
                    {/* Ao passar o mouse: Ler Matéria */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/45 backdrop-blur-[2px]">
                      <div className="bg-cut-red text-white text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-1 rounded shadow-xl flex items-center gap-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                        <BookOpen size={13} />
                        <span>Ler Matéria</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3.5">
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold text-red-400 uppercase block mb-0.5">
                        {m.category}
                      </span>
                      <h4 className="font-display font-black text-sm xs:text-base sm:text-lg lg:text-xl text-white overlay-title leading-snug line-clamp-2">
                        {m.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão flutuante lateral direito (some ao chegar no 5) */}
            {top5CanScrollRight && (
              <button
                onClick={() => scrollTrilho(top5Ref, 'right')}
                aria-label="Avançar no carrossel"
                className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-14 sm:w-10 sm:h-20 rounded-l-lg bg-black/85 hover:bg-cut-red text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-2xl border-y border-l border-white/15 cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>
        </section>

        {/* TRILHO 3: "DOSSIÊS & GRANDES PAUTAS" */}
        <section id="dossies" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="section-title font-display font-black text-base sm:text-xl flex items-center gap-2">
              <span className="w-1.5 h-4 sm:h-5 bg-cut-red inline-block rounded-full" />
              Dossiês Especiais • Guia &amp; Direitos
            </h2>
            <div className="hidden sm:flex items-center gap-1.5">
              <button onClick={() => scrollTrilho(row2Ref, 'left')} aria-label="Voltar" className="w-7 h-7 rounded-full bg-white/10 hover:bg-cut-red flex items-center justify-center transition-colors">
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => scrollTrilho(row2Ref, 'right')} aria-label="Avançar" className="w-7 h-7 rounded-full bg-white/10 hover:bg-cut-red flex items-center justify-center transition-colors">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div ref={row2Ref} className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar scroll-smooth">
            {linhaMaterias.map((m) => (
              <StreamingCard
                key={m.id}
                item={m}
                onOpen={setActiveModalItem}
                className="w-[82vw] xs:w-[68vw] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/2.5)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-2.5rem)/3)]"
              />
            ))}
          </div>
        </section>

        {/* TRILHO 5: SHORTS DA CUT */}
        <section id="shorts" className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] font-mono text-cut-red font-bold uppercase tracking-widest block">Vídeos Curtos</span>
              <h2 className="section-title font-display font-black text-base sm:text-xl flex items-center gap-1.5">
                <Film size={18} className="text-cut-red" />
                Shorts da CUT • Assista em Segundos
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <button onClick={() => scrollTrilho(videosRef, 'left')} aria-label="Voltar" className="w-7 h-7 rounded-full bg-white/10 hover:bg-cut-red flex items-center justify-center transition-colors">
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => scrollTrilho(videosRef, 'right')} aria-label="Avançar" className="w-7 h-7 rounded-full bg-white/10 hover:bg-cut-red flex items-center justify-center transition-colors">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div ref={videosRef} className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar scroll-smooth">
            {videosCurtos.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setVideoIdx(i)}
                aria-label={v.title}
                className="group shorts-card relative shrink-0 snap-start w-[72vw] xs:w-[58vw] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-2.5rem)/3)] aspect-[9/15] sm:aspect-[9/15] lg:aspect-[9/15] max-h-[560px] rounded-xl overflow-hidden bg-black border border-white/10 hover:border-cut-red hover:scale-[1.02] transition-all duration-300 text-left shadow-lg"
              >
                <img src={v.image} alt={v.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
                <div className="absolute top-2.5 inset-x-2.5 flex justify-between items-center text-[8px] font-mono z-10">
                  <span className="bg-cut-red text-white px-2 py-0.5 rounded font-black uppercase shadow">{v.tag}</span>
                  <span className="bg-black/70 text-white px-2 py-0.5 rounded border border-white/10 font-bold">{v.duration}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cut-red text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl border border-white/20">
                    <Play size={18} fill="#fff" className="ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                    #{v.tag}
                  </span>
                  <h4 className="shorts-card-title font-display font-black text-base sm:text-lg lg:text-xl text-white leading-snug line-clamp-2">
                    {v.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* TRILHO 6: MULTIMÍDIA (CONTAINER VERMELHO UNIFICADO COM CORES COERENTES) */}
        <section id="multimidia" className="pt-2">
          <div className="acervo-textura-cut rounded-2xl p-4 sm:p-6 lg:p-8 border border-red-700/50 shadow-2xl space-y-5 text-white">
            {/* Cabeçalho interno da seção com harmonia cromática */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/20">
              <h2 className="font-display font-black text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <span className="w-2.5 h-5 bg-white rounded-full inline-block shadow-sm" />
                Multimídia
              </h2>
              <span className="text-[11px] font-mono text-amber-300/90 font-bold uppercase tracking-widest hidden sm:inline-block">
                Arquivo Digital &bull; CUT Brasil
              </span>
            </div>

            {/* Destaque Principal Multimídia */}
            {multimediaItems[0] && (
              <div
                onClick={() => setActiveModalItem(multimediaItems[0])}
                className="bg-black/45 hover:bg-black/60 border border-white/20 hover:border-white/40 rounded-2xl p-4 sm:p-6 transition-all duration-300 cursor-pointer group shadow-xl backdrop-blur-md"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-center">
                  {/* Imagem com badges contrastantes */}
                  <div className="lg:col-span-6 xl:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-black/70 shadow-2xl border border-white/10">
                    <img
                      src={multimediaItems[0].image}
                      alt={multimediaItems[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-[10px] font-mono">
                      <span className="bg-white text-black font-black px-2.5 py-0.5 rounded shadow text-[10px] uppercase tracking-wider">
                        {multimediaItems[0].category}
                      </span>
                      <span className="bg-black/80 backdrop-blur-sm text-amber-300 px-2.5 py-0.5 rounded border border-white/20 font-bold">
                        Ano: {multimediaItems[0].year}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo com títulos e cores revistas */}
                  <div className="lg:col-span-6 xl:col-span-7 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/20 text-amber-300 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                      <Sparkles size={12} className="text-amber-300" />
                      <span>Destaque Multimídia</span>
                    </div>

                    {/* TÍTULO REVISTO EM CORES */}
                    <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white group-hover:text-amber-100 transition-colors leading-tight drop-shadow-md">
                      {multimediaItems[0].title}
                    </h3>

                    <p className="text-white/95 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 font-normal">
                      {multimediaItems[0].description}
                    </p>

                    {/* BOTÃO REPENSADO: BRANCO DE ALTO CONTRASTE E DESTAQUE */}
                    <div className="pt-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 bg-white hover:bg-amber-300 text-black font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      >
                        <Play size={14} fill="#000" />
                        <span>Acessar Conteúdo</span>
                        <ArrowRight size={14} className="ml-0.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Demais Itens Multimídia dentro do container vermelho */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {multimediaItems.slice(1).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden bg-black/45 hover:bg-black/65 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer flex flex-col justify-end shadow-xl backdrop-blur-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  {/* Badges superiores coerentes com o fundo */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[9px] font-mono">
                    <span className="bg-white text-black px-2.5 py-0.5 rounded font-black uppercase shadow tracking-wider">
                      {item.category}
                    </span>
                    <span className="bg-black/80 text-amber-300 px-2 py-0.5 rounded border border-white/20 font-bold">
                      {item.year}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 relative z-10 space-y-1.5">
                    <div className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                      {item.duration}
                    </div>
                    
                    {/* TÍTULO DOS CARDS SECUNDÁRIOS */}
                    <h3 className="font-display font-black text-base sm:text-lg text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    {/* BOTÃO REPENSADO PARA OS CARDS SECUNDÁRIOS */}
                    <div className="pt-1.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 hover:bg-white text-white hover:text-black border border-white/30 text-xs font-bold transition-all shadow-sm">
                        <span>Ver conteúdo</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. INDICADORES DIEESE • BENTO GRID COM BIG NUMBERS & BOJUDO    */}
        {/* -------------------------------------------------------------- */}
        <section id="dieese" className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-cut-red font-bold uppercase tracking-widest block">
                Inteligência Sindical &amp; Estatística Oficial
              </span>
              <h2 className="section-title font-display font-black text-lg sm:text-2xl flex items-center gap-2">
                <TrendingUp size={22} className="text-cut-red" />
                Indicadores DIEESE
              </h2>
            </div>
            <a
              href="https://www.dieese.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-gray-400 hover:text-cut-red flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Acessar portal DIEESE completo</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* BENTO GRID BOJUDO COM TAMANHOS DIFERENCIADOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

            {/* CARD 1 (HERO BOJUDO - 7 COLUNAS): SALÁRIO MÍNIMO NECESSÁRIO */}
            <div className="lg:col-span-7 bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 sm:p-6 lg:p-7 relative overflow-hidden dieese-bento-card group flex flex-col justify-between">
              {/* Efeito sutil de luz de fundo */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-cut-red/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cut-red/15 transition-all" />

              <div>
                {/* Header do Card com Badges Bojudas */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-cut-red/15 text-cut-red border border-cut-red/30 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider">
                    ★ Referência Constitucional
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold">
                    +0,8% no mês
                  </span>
                </div>

                <span className="text-xs sm:text-sm font-mono text-gray-400 font-bold uppercase tracking-wider block">
                  Salário Mínimo Necessário DIEESE
                </span>

                {/* BIG NUMBER BOJUDO */}
                <div className="dieese-bignumber text-4xl sm:text-5xl lg:text-6xl font-black text-white my-2.5 tracking-tight">
                  R$ 7.067,18
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium max-w-xl">
                  Estimativa calculada pelo DIEESE para atender aos preceitos constitucionais de alimentação, moradia, saúde, educação, vestuário, higiene, transporte e previdência de uma família de 4 pessoas.
                </p>
              </div>

              {/* Comparador Bojudo com Salário Mínimo Oficial */}
              <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-black/45 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">
                    Comparativo com Piso Vigente (R$ 1.621,00)
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <TrendingUp size={15} className="text-cut-red" />
                    <span>Equivale a 4,36 vezes o salário mínimo oficial</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-cut-red text-white text-xs font-black font-mono tracking-wider shrink-0 shadow text-center">
                  DIFERENÇA: 4,36x
                </div>
              </div>
            </div>

            {/* CARD 2 (BOJUDO - 5 COLUNAS): TAXA DE DESEMPREGO */}
            <div className="lg:col-span-5 bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden dieese-bento-card group flex flex-col justify-between">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider">
                    Mercado de Trabalho
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <TrendingDown size={12} /> Menor da série
                  </span>
                </div>

                <span className="text-xs sm:text-sm font-mono text-gray-400 font-bold uppercase tracking-wider block">
                  Taxa de Desemprego no Brasil
                </span>

                {/* BIG NUMBER BOJUDO */}
                <div className="dieese-bignumber text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-400 my-2.5 tracking-tight">
                  5,6%
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                  Taxa segue em nível mínimo histórico, sustentada pela expansão do emprego com carteira assinada na indústria, serviços e infraestrutura.
                </p>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Rendimento médio real dos trabalhadores em alta</span>
              </div>
            </div>

            {/* CARD 3 (BOJUDO - 4 COLUNAS): SALÁRIO MÍNIMO OFICIAL */}
            <div className="lg:col-span-4 bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 relative overflow-hidden dieese-bento-card group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cut-red/15 text-cut-red border border-cut-red/30 text-[10px] font-mono font-bold uppercase">
                    Piso Nacional 2026
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 font-bold">Vigente</span>
                </div>

                <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider block">
                  Salário Mínimo Oficial
                </span>

                {/* BIG NUMBER */}
                <div className="dieese-bignumber text-3xl sm:text-4xl lg:text-5xl font-black text-white my-2 tracking-tight">
                  R$ 1.621,00
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  Reajustado com a política permanente de valorização: reposição da inflação integral pelo INPC somada ao crescimento real do PIB.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Ganho real acima da inflação</span>
                <span className="text-cut-red font-bold">+6,97%</span>
              </div>
            </div>

            {/* CARD 4 (BOJUDO - 4 COLUNAS): CESTA BÁSICA SP */}
            <div className="lg:col-span-4 bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 relative overflow-hidden dieese-bento-card group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold uppercase">
                    17 Capitais
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <TrendingDown size={11} /> -1,2% no mês
                  </span>
                </div>

                <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider block">
                  Cesta Básica (São Paulo)
                </span>

                {/* BIG NUMBER */}
                <div className="dieese-bignumber text-3xl sm:text-4xl lg:text-5xl font-black text-white my-2 tracking-tight">
                  R$ 842,30
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  Custo médio dos 13 produtos de alimentação básica necessários para o sustento de um trabalhador adulto durante um mês.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Alívio nos alimentos</span>
                <span className="text-emerald-400 font-bold">Deflação mensal</span>
              </div>
            </div>

            {/* CARD 5 (BOJUDO - 4 COLUNAS): INPC */}
            <div className="lg:col-span-4 bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 relative overflow-hidden dieese-bento-card group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold uppercase">
                    Dissídios &amp; Acordos
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 font-bold">IBGE / DIEESE</span>
                </div>

                <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider block">
                  INPC • Inflação Mensal
                </span>

                {/* BIG NUMBER */}
                <div className="dieese-bignumber text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 my-2 tracking-tight">
                  0,34%
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  Índice de Preços ao Consumidor que afere os custos de vida das famílias com renda de até 5 salários, base das campanhas salariais da CUT.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Referência sindical</span>
                <span className="text-amber-300 font-bold">Reposição Salarial</span>
              </div>
            </div>

          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* ATENDIMENTO: FALE COM A SECRETARIA GERAL                        */}
        {/* -------------------------------------------------------------- */}
        <section id="secretaria" className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Lado Esquerdo: Orientações */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="flex items-center gap-1.5 text-cut-red text-xs font-mono font-bold uppercase tracking-wider">
                <Phone size={14} /> Atendimento Oficial
              </div>
              <h3 className="service-card-title font-display font-black text-lg sm:text-2xl uppercase">
                Fale com a Secretaria Geral
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                Envie sua dúvida, sugestão ou demanda institucional diretamente para a direção nacional da Central Única dos Trabalhadores.
              </p>
              <div className="pt-2 text-xs font-mono text-gray-400 space-y-1">
                <div>E-mail: <span className="text-white font-bold">secretaria@cut.org.br</span></div>
                <div>Horário: Segunda a sexta, das 9h às 18h</div>
              </div>
            </div>

            {/* Lado Direito: Formulário */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContato} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    required
                    value={contato.nome}
                    onChange={(e) => setContato({ ...contato, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cut-red transition-colors"
                  />
                  <input
                    required
                    type="email"
                    value={contato.email}
                    onChange={(e) => setContato({ ...contato, email: e.target.value })}
                    placeholder="Seu e-mail corporativo ou pessoal"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cut-red transition-colors"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  value={contato.mensagem}
                  onChange={(e) => setContato({ ...contato, mensagem: e.target.value })}
                  placeholder="Escreva sua mensagem ou solicitação..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cut-red resize-none transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-cut-red hover:bg-white hover:text-cut-red text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors font-mono cursor-pointer shadow-lg"
                >
                  {contatoEnviado ? '✓ Mensagem Enviada com Sucesso!' : 'Enviar Mensagem para a Secretaria'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 7. FEDERAÇÃO CUT: 27 ESTADUAIS & RAMOS                         */}
        {/* -------------------------------------------------------------- */}
        <section id="estaduais" className="pt-4 border-t border-white/10">
          <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
            {/* Cabeçalho Integrado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[9px] font-mono text-cut-red font-bold uppercase tracking-widest block">Rede Federativa</span>
                <h2 className="section-title font-display font-black text-lg sm:text-2xl flex items-center gap-2">
                  <MapPin size={20} className="text-cut-red" />
                  Canais Regionais: CUT nos 27 Estados
                </h2>
              </div>

              <div className="relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filtrar UF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-cut-red transition-colors"
                />
              </div>
            </div>

            {/* Split Layout Interativo: Navegador (7 cols) + Ficha Ativa (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* COLUNA ESQUERDA: NAVEGADOR DE ESTADOS */}
              <div className="lg:col-span-7 space-y-3.5">
                {/* Abas de Regiões */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar font-mono text-xs">
                  {regioes.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setFiltroRegiao(reg)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        filtroRegiao === reg
                          ? 'bg-cut-red text-white shadow-md'
                          : 'bg-black/30 hover:bg-white/10 text-gray-300 border border-white/10'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>

                {/* Grid dos 27 Estados em formato de Chips Ergonômicos */}
                <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 font-mono text-xs">
                  {estadosFiltrados.map((e) => (
                    <button
                      key={e.uf}
                      onClick={() => setSelectedEstado(e.uf)}
                      className={`py-2 rounded-xl text-center font-bold transition-all text-xs cursor-pointer ${
                        selectedEstado === e.uf
                          ? 'bg-cut-red text-white scale-105 shadow-lg ring-2 ring-red-400/50 font-black'
                          : 'bg-black/40 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {e.uf}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLUNA DIREITA: FICHA DE DESTAQUE DO ESTADO ATIVO */}
              <div className="lg:col-span-5">
                {estadoSel && (
                  <div className="h-full bg-black/45 border border-cut-red/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cut-red bg-cut-red/10 border border-cut-red/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <MapPin size={11} /> {estadoSel.regiao}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 font-bold">
                          UF: {estadoSel.uf}
                        </span>
                      </div>

                      <div className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
                        CUT {estadoSel.nome} ({estadoSel.uf})
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                          <span className="text-gray-400 block text-[10px] uppercase">Presidente</span>
                          <strong className="text-white text-sm block mt-0.5">{estadoSel.presidente}</strong>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono flex items-center justify-between">
                          <span className="text-gray-400 text-[10px] uppercase">Sindicatos Filiados</span>
                          <strong className="text-cut-red font-black text-base">{estadoSel.sindicatos}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Acessando portal da CUT-${estadoSel.uf}...`)}
                      className="w-full bg-cut-red hover:bg-white hover:text-cut-red text-white py-2.5 rounded-xl text-xs font-black uppercase font-mono transition-all shadow-lg hover:shadow-xl cursor-pointer text-center"
                    >
                      Acessar Canal CUT-{estadoSel.uf} →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RAMOS DE ATUAÇÃO SINDICAL INTEGRADOS */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="section-title font-display font-black text-base sm:text-lg lg:text-xl uppercase mb-3 flex items-center gap-2">
                <Layers size={18} className="text-cut-red" /> Ramos de Atuação
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {ramos.map((r) => {
                  const Icone = r.icone;
                  return (
                    <div
                      key={r.nome}
                      className="ramos-card p-3.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-cut-red transition-all duration-300 flex flex-col justify-between shadow hover:-translate-y-1 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-cut-red text-white flex items-center justify-center mb-2.5 transition-colors">
                        <Icone size={16} />
                      </div>
                      <div>
                        <div className="font-display font-black text-xs sm:text-sm text-white group-hover:text-cut-red transition-colors">
                          {r.nome}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono truncate mt-0.5">
                          {r.setor}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 8. SERVIÇOS SINDICAIS & PARCEIROS                              */}
        {/* -------------------------------------------------------------- */}
        <section id="servicos" className="pt-4 border-t border-white/10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: CreditCard, titulo: 'Emissão de Boletos', desc: 'Guias e contribuições sindicais.', btn: 'Gerar Boleto', msg: 'Acessando emissão de boletos.' },
              { icon: Mail, titulo: 'Webmail Institucional', desc: 'Comunicação oficial de dirigentes.', btn: 'Entrar no Webmail', msg: 'Redirecionando para webmail.' },
              { icon: BookOpen, titulo: 'Biblioteca Digital', desc: 'Teses de congressos e cartilhas.', btn: 'Acessar Biblioteca', msg: 'Abrindo biblioteca digital.' },
            ].map((s) => {
              const Icone = s.icon;
              return (
                <div key={s.titulo} className="p-4 rounded-lg bg-[#1c1c1c] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded bg-cut-red text-white flex items-center justify-center mb-2">
                      <Icone size={16} />
                    </div>
                    <h4 className="service-card-title font-display font-black text-base sm:text-lg uppercase mb-1">{s.titulo}</h4>
                    <p className="service-card-desc text-[11px] leading-relaxed">{s.desc}</p>
                  </div>
                  <button
                    onClick={() => alert(s.msg)}
                    className="mt-3 w-full bg-white/10 hover:bg-cut-red text-white py-1.5 rounded text-xs font-bold uppercase transition-colors"
                  >
                    {s.btn}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cut-red uppercase tracking-wider block">
                  Rede de Cooperação Sindical
                </span>
                <h3 className="section-title font-display font-black text-lg sm:text-xl lg:text-2xl">
                  Parceiros da CUT
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>4 Instituições Conectadas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {parceiros.map((p) => (
                <div
                  key={p.sigla}
                  className="group relative p-4 bg-[#181818] hover:bg-[#202020] border border-white/10 hover:border-cut-red rounded-xl transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cut-red/10 hover:-translate-y-1"
                >
                  <div>
                    {/* Container do Logo com tamanho exatamente uniforme (aspect ratio 2:1 padronizado) */}
                    <div className="w-full aspect-[2/1] rounded-lg bg-white p-3 sm:p-4 flex items-center justify-center mb-3.5 shadow-sm border border-gray-100 overflow-hidden">
                      <img
                        src={p.logo}
                        alt={p.sigla}
                        className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300 select-none"
                      />
                    </div>

                    {/* Cabeçalho do Card */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <h4 className="service-card-title font-display font-black text-lg sm:text-xl lg:text-2xl group-hover:text-cut-red transition-colors">
                        {p.sigla}
                      </h4>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/5">
                        {p.categoria}
                      </span>
                    </div>

                    <div className="service-card-desc text-xs font-semibold line-clamp-1 mb-1.5">
                      {p.nome}
                    </div>

                    <p className="service-card-desc text-[11px] leading-relaxed line-clamp-2 mb-3">
                      {p.desc}
                    </p>
                  </div>

                  {/* Ação do parceiro (Acesso direto) */}
                  <div className="pt-3 border-t border-white/10">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 hover:bg-cut-red text-white text-xs font-bold font-mono transition-all duration-200 group-hover:bg-cut-red group-hover:shadow-md"
                    >
                      <span>Acessar portal oficial</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* -------------------------------------------------------------- */}
      {/* 9. FOOTER STREAMING                                            */}
      {/* -------------------------------------------------------------- */}
      <footer className="bg-[#0c0c0c] text-white pt-10 pb-8 page-gutter border-t border-white/10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 text-sm">
          <div>
            <a href="#" className="inline-block mb-3" aria-label="Voltar ao início">
              <img
                src="/images/logo-cut-oficial.svg"
                alt="CUT - Central Única dos Trabalhadores"
                className="h-10 sm:h-12 w-auto filter brightness-0 invert drop-shadow-sm transition-transform hover:scale-105"
              />
            </a>
            <p className="text-gray-400 text-xs leading-relaxed">
              Central Única dos Trabalhadores. A maior central sindical da América Latina e a quinta maior do mundo.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider text-cut-red mb-3">Catálogo</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><a href="#em-alta" className="hover:text-white">Em Alta Agora</a></li>
              <li><a href="#campanhas" className="hover:text-white">Campanha CUT 2026</a></li>
              <li><a href="#dossies" className="hover:text-white">Dossiês Especiais</a></li>
              <li><a href="#shorts" className="hover:text-white">Shorts &amp; Vídeos</a></li>
              <li><a href="#multimidia" className="hover:text-white">Multimídia</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider text-cut-red mb-3">Serviços</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><a href="#servicos" className="hover:text-white">Emissão de Boletos</a></li>
              <li><a href="#servicos" className="hover:text-white">Webmail Institucional</a></li>
              <li><a href="#servicos" className="hover:text-white">Biblioteca Digital</a></li>
              <li><a href="#secretaria" className="hover:text-white">Secretaria Geral</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider text-cut-red mb-3">Redes da CUT</h4>
            <div className="flex flex-wrap gap-1.5">
              {redesSociais.map((r) => (
                <a
                  key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                  aria-label={r.nome}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-cut-red text-white flex items-center justify-center transition-colors"
                >
                  <SocialGlyph id={r.id} size={11} />
                </a>
              ))}
            </div>
            <div className="mt-3 text-[10px] text-gray-500 font-mono">
              secretaria@cut.org.br • (11) 2108-9200
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-gray-500">
          <div>© 2026 Central Única dos Trabalhadores • Portal CUT Streaming Edition.</div>
          <a href="#inicio" className="hover:text-white">Voltar ao topo ↑</a>
        </div>
      </footer>

      {/* -------------------------------------------------------------- */}
      {/* 10. MODAIS & ACESSIBILIDADE                                    */}
      {/* -------------------------------------------------------------- */}
      <StreamingModal item={activeModalItem} onClose={() => setActiveModalItem(null)} />

      {videoIdx !== null && (
        <ShortPlayerModal
          videos={videosCurtos}
          index={videoIdx}
          onChange={setVideoIdx}
          onClose={() => setVideoIdx(null)}
        />
      )}

      {/* Botão de acessibilidade flutuante */}
      <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-2">
        {a11yOpen && (
          <div role="dialog" aria-label="Acessibilidade" className="bg-[#202020] border border-white/20 p-3.5 rounded-xl w-56 shadow-2xl font-mono text-xs mb-1">
            <div className="font-bold mb-2.5 uppercase text-white">Acessibilidade</div>
            <div className="flex items-center justify-between mb-2.5 text-gray-300">
              <span>Fonte: {fontScale}%</span>
              <div className="flex gap-1">
                <button onClick={() => setFontScale((s) => Math.max(80, s - 10))} className="w-6 h-6 bg-white/10 rounded font-bold hover:bg-cut-red">-</button>
                <button onClick={() => setFontScale((s) => Math.min(150, s + 10))} className="w-6 h-6 bg-white/10 rounded font-bold hover:bg-cut-red">+</button>
              </div>
            </div>
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="w-full py-1.5 bg-white/10 hover:bg-cut-red rounded font-bold mb-1.5 text-center text-white text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={12} className="text-amber-300" />
                  <span>Ativar Fundo Claro</span>
                </>
              ) : (
                <>
                  <Moon size={12} />
                  <span>Ativar Fundo Escuro</span>
                </>
              )}
            </button>
            <button onClick={() => setHighContrast((v) => !v)} className="w-full py-1 bg-white/10 hover:bg-cut-red rounded font-bold mb-1 text-center text-white text-[11px]">
              {highContrast ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
            </button>
            <button onClick={() => { setFontScale(100); setHighContrast(false); }} className="w-full py-1 text-gray-400 hover:text-white text-center text-[9px]">
              Restaurar Padrão
            </button>
          </div>
        )}

        <button
          onClick={() => setA11yOpen(!a11yOpen)}
          aria-label="Acessibilidade"
          className="w-11 h-11 bg-cut-red hover:bg-white hover:text-cut-red text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer"
        >
          <Accessibility size={20} />
        </button>
      </div>

    </div>
  );
}
