class ParallelProcessor {
    async simulateAsyncTask(message, delay) {
        console.log(`Iniciando processamento: ${message}`);
        await new Promise((resolve) => setTimeout(resolve, delay)); // Simula uma tarefa assíncrona
        console.log(`Finalizando processamento: ${message}`);
    }
    async processMessagesInParallel(messages) {
        const MAX_CONCURRENT_TASKS = 32; // Quantidade máxima de tarefas simultâneas
        // Divide as mensagens em chunks para respeitar o limite de paralelismo
        const chunks = this.chunkArray(messages, MAX_CONCURRENT_TASKS);
        for (const chunk of chunks) {
            // Processa as mensagens no chunk em paralelo
            await Promise.all(chunk.map((message) => this.simulateAsyncTask(message, 2000)) // Simula 2 segundos de atraso por mensagem
            );
        }
    }
    chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }
    async testParallelProcessing() {
        const testMessages = Array.from({ length: 50 }, (_, i) => `Mensagem ${i + 1}`); // 50 mensagens fictícias
        console.time('Total Processing Time'); // Inicia o timer para medir o tempo total
        await this.processMessagesInParallel(testMessages);
        console.timeEnd('Total Processing Time'); // Finaliza o timer e imprime o tempo total
        console.log('Processamento completo!');
    }
}
// Executa o teste
(async () => {
    const processor = new ParallelProcessor();
    await processor.testParallelProcessing();
})();
//# sourceMappingURL=paralelismo.js.map