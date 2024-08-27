# Blockchain-e-criptomoedas

| **Autor** | **NUSP**     |
|-------------------|------------|
| Aruan Bretas     | 12609731    |

# Sistema de Monitoramento Seguro de Dispositivos IoT com Blockchain

## Objetivo
Desenvolver um protótipo de um sistema que utiliza blockchain para garantir a segurança e privacidade na comunicação entre dispositivos IoT em um ambiente doméstico inteligente. O sistema visa prevenir ataques cibernéticos e assegurar a integridade dos dados transmitidos entre os dispositivos.

## Componentes do Protótipo

### Dispositivos IoT Simulados

- **Sensores de Temperatura e Umidade:** Monitoramento das condições ambientais em tempo real.
- **Câmera de Segurança:** Captura de vídeo em tempo real com transmissão segura.
- **Trancas Inteligentes:** Controle seguro de acesso a ambientes.

### Blockchain

- **Plataforma:** Seleção de uma plataforma blockchain, como Ethereum ou Hyperledger, para o registro de transações entre dispositivos IoT.
- **Contratos Inteligentes:** Desenvolvimento de contratos inteligentes que definam regras de comunicação entre dispositivos, incluindo autenticação, permissões de acesso e registro de eventos.

### Gateway IoT

Implementação de um gateway central que atua como intermediário entre os dispositivos IoT e a rede blockchain, validando transações, verificando permissões e comunicando-se com o blockchain para registrar dados.

### Interface de Usuário (UI)

- **Aplicação Web ou Mobile:** Criação de uma interface que permita aos usuários visualizar o status dos dispositivos IoT, autorizar ou revogar acessos, e monitorar as transações registradas no blockchain.
- **Visualização de Logs:** Exibição dos logs de transações, incluindo tentativas de acesso e eventos de segurança.

## Funcionamento do Protótipo

### Registro de Dispositivos
Registro de cada dispositivo IoT no blockchain com uma identidade única e segura, incluindo chaves criptográficas para autenticação.

### Autenticação e Comunicação Segura
Verificação da identidade e das permissões de comunicação entre dispositivos IoT via blockchain, garantindo que apenas interações autorizadas sejam permitidas.

### Registro de Transações
Registro de todas as interações entre dispositivos IoT como transações no blockchain, assegurando que qualquer tentativa de violação ou acesso não autorizado seja detectada e registrada de forma imutável.

### Privacidade dos Dados
Utilização de técnicas de criptografia para garantir a proteção dos dados sensíveis transmitidos entre dispositivos IoT, com criptografia dos dados antes de seu registro no blockchain.

### Notificações de Segurança
Implementação de um sistema de notificações para alertar os usuários em caso de tentativas de acesso não autorizado, permitindo ações imediatas, como o bloqueio de dispositivos comprometidos.
