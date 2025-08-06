<?php

declare(strict_types=1);

/**
 * Generates a shortlinks.json file filled with random shortlink data for development/testing.
 */

const OUTPUT_FILE = __DIR__ . '/shortlinks.json';
const DEFAULT_COUNT = 50;

function generateRandomString(int $length = 6): string
{
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $charLen = strlen($characters);
    $str = '';
    for ($i = 0; $i < $length; $i++) {
        $str .= $characters[random_int(0, $charLen - 1)];
    }
    return $str;
}

function generateRandomUrl(): string
{
    $domains = [
        'google.com', 'facebook.com', 'twitter.com',
        'openai.com', 'github.com', 'stackoverflow.com',
        'example.com', 'amazon.com', 'apple.com', 'linkedin.com'
    ];
    $path = '/' . generateRandomString(random_int(3, 10));
    $query = '?q=' . generateRandomString(5);
    return 'https://www.' . $domains[array_rand($domains)] . $path . $query;
}

function generateRandomLabel(): string
{
    $labels = [
        'Portfolio', 'Search', 'Social', 'Docs', 'AI', 'Git Repo',
        'Test Link', 'Blog', 'Article', 'Demo', 'Store', 'Music', 'Video'
    ];
    return $labels[array_rand($labels)];
}

function generateRandomTags(): array
{
    $tags = ['work', 'social', 'test', 'ai', 'personal', 'search', 'news', 'tech', 'fun', 'urgent'];
    shuffle($tags);
    return array_slice($tags, 0, random_int(1, 3));
}

function generateRandomShortlink(): array
{
    $id = generateRandomString(6);
    $shortUrl = "http://bit.ly/$id";
    $createdAtTimestamp = time() - random_int(0, 3600 * 24 * 90); // random up to 90 days in the past
    $expiresAt = (random_int(0, 1) === 1)
        ? date(DATE_ATOM, time() + random_int(0, 3600 * 24 * 60))  // random up to 60 days in the future
        : null;

    return [
        'id'         => $id,
        'originalUrl'=> generateRandomUrl(),
        'shortUrl'   => $shortUrl,
        'label'      => generateRandomLabel(),
        'createdAt'  => date(DATE_ATOM, $createdAtTimestamp),
        'clicks'     => random_int(0, 1000),
        'active'     => (bool)random_int(0, 1),
        'expiresAt'  => $expiresAt,
        'qrCodeUrl'  => 'https://api.qrserver.com/v1/create-qr-code/?data=' . urlencode($shortUrl),
        'tags'       => generateRandomTags(),
    ];
}

/**
 * @param int $count
 * @return array
 */
function generateShortlinks(int $count): array
{
    $shortlinks = [];
    for ($i = 0; $i < $count; $i++) {
        $shortlinks[] = generateRandomShortlink();
    }
    return $shortlinks;
}

$count = DEFAULT_COUNT;
if ($argc > 1) {
    if (!is_numeric($argv[1]) || (int)$argv[1] < 1) {
        fwrite(STDERR, "Usage: php generate_shortlinks.php [count]\n");
        exit(1);
    }
    $count = (int)$argv[1];
}

$shortlinks = generateShortlinks($count);

$json = json_encode($shortlinks, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
if (file_put_contents(OUTPUT_FILE, $json) === false) {
    fwrite(STDERR, "Error: Failed to write to " . OUTPUT_FILE . "\n");
    exit(2);
}

echo "Successfully generated {$count} shortlinks in " . OUTPUT_FILE . PHP_EOL;