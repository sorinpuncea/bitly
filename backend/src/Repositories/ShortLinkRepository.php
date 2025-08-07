<?php

namespace Api\Repositories;

class ShortLinkRepository
{
    private string $filePath;
    /** @var array<array<string, mixed>> */
    private array $shortLinks = [];

    public function __construct(string $filePath)
    {
        $this->filePath = $filePath;
        $this->load();
    }

    private function load(): void
    {
        if (!file_exists($this->filePath)) {
            throw new \RuntimeException("Data file not found: {$this->filePath}");
        }
        $json = file_get_contents($this->filePath);
        if ($json === false) {
            throw new \RuntimeException("Cannot read data file: {$this->filePath}");
        }
        $decoded = json_decode($json, true);
        if (!is_array($decoded)) {
            throw new \RuntimeException("Malformed data in {$this->filePath}");
        }
        $this->shortLinks = $decoded;
    }

    /**
     * @return array<array<string, mixed>>
     */
    public function getAll(): array
    {
        return $this->shortLinks;
    }

    /**
     * @param string $id
     * @return array<string, mixed>|null
     */
    public function findById(string $id): ?array
    {
        foreach ($this->shortLinks as $sl) {
            if (isset($sl['id']) && $sl['id'] === $id) {
                return $sl;
            }
        }
        return null;
    }
}
