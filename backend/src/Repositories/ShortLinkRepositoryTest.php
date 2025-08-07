<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Api\Repositories\ShortLinkRepository;

final class ShortLinkRepositoryTest extends TestCase
{
    private string $fixturePath;

    protected function setUp(): void
    {
        // build some sample data
        $this->fixturePath = __DIR__ . '/testdata.json';
        $sampleData = [
            [
                "id" => "abc123",
                "originalUrl" => "https://google.com",
                "shortUrl" => "http://bit.ly/abc123",
                "label" => "Google",
                "createdAt" => "2024-07-01T10:12:00Z",
                "clicks" => 17,
                "active" => true,
                "expiresAt" => null,
                "qrCodeUrl" => null,
                "tags" => ["search"]
            ]
        ];
        file_put_contents($this->fixturePath, json_encode($sampleData));
    }

    protected function tearDown(): void
    {
        if (file_exists($this->fixturePath)) {
            unlink($this->fixturePath);
        }
    }

    public function testLoadAllShortLinks(): void
    {
        $repo = new ShortLinkRepository($this->fixturePath);
        $all = $repo->getAll();
        $this->assertIsArray($all);
        $this->assertCount(1, $all);
        $this->assertEquals('abc123', $all[0]['id']);
    }

    public function testFindByIdReturnsCorrectLink(): void
    {
        $repo = new ShortLinkRepository($this->fixturePath);
        $result = $repo->findById('abc123');
        $this->assertNotNull($result);
        $this->assertEquals('abc123', $result['id']);
    }

    public function testFindByIdReturnsNullIfNotFound(): void
    {
        $repo = new ShortLinkRepository($this->fixturePath);
        $result = $repo->findById('notfound');
        $this->assertNull($result);
    }

    public function testThrowsExceptionIfFileNotExists(): void
    {
        $this->expectException(RuntimeException::class);
        new ShortLinkRepository(__DIR__ . '/idontexist.json');
    }
}
