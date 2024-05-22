document.getElementById('finalizarPedidoBtn').addEventListener('click', function() {
    // Get all products in the cart
    const produtos = document.querySelectorAll('tbody tr');
    const produtosNoCarrinho = [];

    produtos.forEach(produto => {
        const quantidadeElement = produto.querySelector('.qtdProduto');
        const quantidade = parseInt(quantidadeElement.textContent);

        if (quantidade > 0) {
            const nome = produto.querySelector('.name').textContent;
            const preco = parseFloat(produto.querySelector('td[data-preco]').dataset.preco);
            const total = quantidade * preco;

            produtosNoCarrinho.push({
                nome: nome,
                quantidade: quantidade,
                preco: preco.toFixed(2),
                total: total.toFixed(2)
            });
        }
    });

    if (produtosNoCarrinho.length > 0) {
        gerarPDF(produtosNoCarrinho);
        // Zera a quantidade dos produtos no carrinho
        zerarQuantidadeNoCarrinho();
    } else {
        alert('O carrinho está vazio!');
    }
});

function gerarPDF(produtos) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurações de estilo
    const headerFontSize = 18;
    const titleFontSize = 16;
    const itemFontSize = 14;
    const bodyFontSize = 12;
    const margin = 20;
    const lineSpacing = 6;
    // Posição inicial da imagem
    const imageY = 5;

    // Adicionar imagem do logo
    const imagemBase64 = "data:image/jpeg;base64,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";
    const imgWidth = 50;
    const imgHeight = 30;

    doc.addImage(imagemBase64, 'JPEG', (doc.internal.pageSize.width - imgWidth) / 2, imageY, imgWidth, imgHeight); // Ajustando a posição da imagem
    let y = imageY + imgHeight + lineSpacing;
    y += lineSpacing * 1;

    // Adicionar fundo colorido na linha "Bolos da Helen"
    doc.setFillColor('#716cff');
    doc.rect(0, y - 10, doc.internal.pageSize.width, 15, 'F'); // Aumentei a altura para 20
    doc.setFontSize(headerFontSize);
    doc.setTextColor(255, 255, 255);
    doc.text('Bolos da Helen', margin, y);
    y += lineSpacing * 4;

    // Título do recibo
    doc.setFontSize(titleFontSize);
    doc.setTextColor(0, 0, 0);
    doc.text('Recibo do Pedido', margin, y);
    y += lineSpacing * 2;

    // Cabeçalho
    doc.setFontSize(itemFontSize);
    doc.text('Produto', margin, y);
    doc.text('Qtd.', margin + 70, y);
    doc.text('Preço', margin + 100, y);
    doc.text('Total', margin + 140, y);
    y += lineSpacing;

    // Linha separadora
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 170, y);
    y += lineSpacing * 2;

    // Produtos
    doc.setFontSize(bodyFontSize);
    produtos.forEach(produto => {
        doc.text(produto.nome, margin, y);
        doc.text(`${produto.quantidade}`, margin + 70, y);
        doc.text(`R$ ${produto.preco.replace('.', ',')}`, margin + 100, y); // Formatação corrigida
        doc.text(`R$ ${produto.total.replace('.', ',')}`, margin + 140, y); // Formatação corrigida
        y += lineSpacing * 2;
    });

    // Linha separadora
    y += lineSpacing * -1;
    doc.line(margin, y, margin + 170, y);
    y += lineSpacing * 2;

    // Cálculo do subtotal
    const subtotal = produtos.reduce((acc, produto) => acc + parseFloat(produto.total), 0).toFixed(2);
    const formattedSubtotal = `R$ ${subtotal.replace('.', ',')}`; // Formatação corrigida

    // Frete fixo
    const frete = 5.00;
    const formattedFrete = `R$ ${frete.toFixed(2).replace('.', ',')}`; // Formatação corrigida

    // Cálculo do desconto
    let desconto = 0.00;
    let descontoText = "";

    if (subtotal > 1000.00) {
        desconto = subtotal * 0.10;
        descontoText = "10%";
    } else if (subtotal > 500.00) {
        desconto = subtotal * 0.075;
        descontoText = "7.5%";
    } else if (subtotal > 200.00) {
        desconto = subtotal * 0.05;
        descontoText = "5%";
    } else if (subtotal >= 100.00) {
        desconto = subtotal * 0.02;
        descontoText = "2%";
    }

    // Calcular o total final com desconto e frete
    const totalFinal = (subtotal + frete - desconto).toFixed(2);
    const formattedTotalFinal = `R$ ${totalFinal.replace('.', ',')}`; // Formatação corrigida

    // Formatar o desconto
    const formattedDesconto = `R$ ${desconto.toFixed(2).replace('.', ',')}`; // Formatação corrigida

    // Resumo da compra
    doc.setFontSize(itemFontSize);
    doc.text(`Subtotal: ${formattedSubtotal}`, margin, y);
    y += lineSpacing * 2;
    doc.text(`Frete: ${formattedFrete}`, margin, y);
    y += lineSpacing * 2;
    doc.text(`Desconto (${descontoText}): ${formattedDesconto}`, margin, y);
    y += lineSpacing * 2;
    
    // Total Final em negrito
    doc.setFontSize(itemFontSize);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Final: ${formattedTotalFinal}`, margin, y);
    y += lineSpacing * 4;

    // Adicionar o link para o WhatsApp
    const linkWhatsApp = "https://api.whatsapp.com/send?phone=5511945390674&text=Ol%C3%A1%20Bolos%20da%20Helen,%20gostaria%20de%20fazer%20um%20or%C3%A7amento.";
    doc.setTextColor(0, 0, 255); // Cor azul para o link
    doc.textWithLink("Envie seu pedido para o nosso WhatsApp", margin, y, {url: linkWhatsApp});

    doc.save('recibo.pdf');
}

// Função para zerar a quantidade dos produtos no carrinho
function zerarQuantidadeNoCarrinho() {
    const produtos = document.querySelectorAll('tbody tr');

    produtos.forEach(produto => {
        const quantidadeElement = produto.querySelector('.qtdProduto');
        quantidadeElement.textContent = '0'; // Zera a quantidade

        const valorTotalElement = produto.querySelector('.valor-Total');
        valorTotalElement.textContent = ''; // Zera o valor total
    });

    // Também é importante atualizar o subtotal, frete, desconto e total final na interface
    document.getElementById('subtotal').textContent = '';
    document.getElementById('frete').textContent = '';
    document.getElementById('desconto').textContent = '';
    document.getElementById('total').textContent = '';
}
