<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe os dados do formulário
    $nomeCliente = $_POST["nome_cliente"];
    $emailCliente = $_POST["email_cliente"];
    $telefoneCliente = $_POST["telefone_cliente"]; // Novo campo telefone
    $enderecoCliente = $_POST["endereco_cliente"];
    $dataDaEntrega = $_POST["data_da_entrega"]; // Novo campo data_da_entrega
    $totalPedido = $_POST["total"];
    $itensPedido = json_decode($_POST["itens_pedido"], true);

    // Validação básica dos dados
    if (empty($nomeCliente) || empty($emailCliente) || empty($telefoneCliente) || empty($enderecoCliente) || empty($dataDaEntrega)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    if (!filter_var($emailCliente, FILTER_VALIDATE_EMAIL)) {
        echo "Por favor, insira um email válido.";
        exit;
    }

    if (!is_numeric($totalPedido)) {
        echo "O valor do total do pedido é inválido.";
        exit;
    }

    if (empty($itensPedido)) {
        echo "O carrinho está vazio.";
        exit;
    }

    // Conexão com o banco de dados (substitua as credenciais)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "confeitaria";

    try {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            throw new Exception("Falha na conexão: " . $conn->connect_error);
        }

        // Inserir dados na tabela 'pedidos'
        $sql = "INSERT INTO pedidos (nome_cliente, email_cliente, telefone, endereco_cliente, data_da_entrega, total) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Falha na preparação da declaração: " . $conn->error);
        }
        $stmt->bind_param("sssssd", $nomeCliente, $emailCliente, $telefoneCliente, $enderecoCliente, $dataDaEntrega, $totalPedido);
        $stmt->execute();
        $pedido_id = $stmt->insert_id;
        $stmt->close();

        // Inserir dados na tabela 'itens_pedido'
        $sql = "INSERT INTO itens_pedido (pedido_id, produto_nome, quantidade, preco_unitario, total) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Falha na preparação da declaração: " . $conn->error);
        }
        foreach ($itensPedido as $item) {
            $stmt->bind_param("isidd", $pedido_id, $item['produto_nome'], $item['quantidade'], $item['preco_unitario'], $item['total']);
            $stmt->execute();
        }
        $stmt->close();

        $conn->close();

        // Exibir mensagem de confirmação e redirecionar para o WhatsApp da loja
        $whatsappUrl = "https://wa.me/55XXXXXXXXXX"; // Substitua pelo número de telefone da loja
        echo "
        <!DOCTYPE html>
        <html lang='pt-BR'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Pedido Realizado</title>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    alert('Pedido realizado com sucesso!');
                    setTimeout(function() {
                        window.location.href = '$whatsappUrl';
                    }, 2000); // Redireciona após 2 segundos
                });
            </script>
        </head>
        <body>
            <h1>Pedido Realizado com Sucesso!</h1>
            <p>Você será redirecionado para nosso WhatsApp em breve.</p>
        </body>
        </html>
        ";
    } catch (Exception $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
} else {
    echo "Método de requisição inválido.";
}
?>