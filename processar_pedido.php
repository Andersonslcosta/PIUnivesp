<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_cliente = $_POST['nome_cliente'];
    $email_cliente = $_POST['email_cliente'];
    $telefone_cliente = $_POST['telefone_cliente']; // Novo campo telefone
    $endereco_cliente = $_POST['endereco_cliente'];
    $data_da_entrega = $_POST['data_da_entrega']; // Novo campo data_da_entrega
    $total = $_POST['total'];
    $itens_pedido = json_decode($_POST['itens_pedido'], true);

    // Conexão com o banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "confeitaria";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão: " . $conn->connect_error);
    }

    // Inserir dados na tabela 'pedidos'
    $sql = "INSERT INTO pedidos (nome_cliente, email_cliente, telefone, endereco_cliente, data_da_entrega, total) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        die("Falha na preparação da declaração: " . $conn->error);
    }

    $stmt->bind_param("sssssd", $nome_cliente, $email_cliente, $telefone_cliente, $endereco_cliente, $data_da_entrega, $total);
    $stmt->execute();
    $pedido_id = $stmt->insert_id;
    $stmt->close();

    // Inserir dados na tabela 'itens_pedido'
    $sql = "INSERT INTO itens_pedido (pedido_id, produto_nome, quantidade, preco_unitario, total) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Falha na preparação da declaração: " . $conn->error);
    }

    foreach ($itens_pedido as $item) {
        $stmt->bind_param("isidd", $pedido_id, $item['produto_nome'], $item['quantidade'], $item['preco_unitario'], $item['total']);
        $stmt->execute();
    }
    $stmt->close();

    $conn->close();

    // Exibir mensagem de confirmação e redirecionar para o WhatsApp da loja
    $whatsappUrl = "https://wa.me/5511964097173"; // Substitua pelo número de telefone da loja
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
} else {
    echo "Método de requisição inválido.";
}
?>
