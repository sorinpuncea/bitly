<?php

namespace Api;

class Logger
{
    private string $logFile;

    public function __construct(string $logFile = __DIR__ . '/../logs/app.log')
    {
        $this->logFile = $logFile;

        $dir = dirname($this->logFile);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
    }

    public function info(string $message): void
    {
        $this->write('INFO', $message);
    }

    public function error(string $message): void
    {
        $this->write('ERROR', $message);
    }

    private function write(string $level, string $message): void
    {
        $date = date('Y-m-d H:i:s');
        $entry = sprintf("[%s] [%s] %s%s", $date, $level, $message, PHP_EOL);

        file_put_contents($this->logFile, $entry, FILE_APPEND | LOCK_EX);
    }
}