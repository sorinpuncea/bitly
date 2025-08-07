<?php
declare(strict_types=1);

use Api\Repositories\ShortLinkRepository;
use Api\Controllers\ShortLinkController;

require __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $repo = new ShortLinkRepository(__DIR__ . '/../data/shortlinks.json');
    $controller = new ShortLinkController($repo);

    $path = $_SERVER['REQUEST_URI'];

    // route /shortlinks/{id}
    if (preg_match('#/shortlinks/([\w\d]+)#', $path, $matches)) {
        $id = $matches[1];
        $link = $controller->detail($id);

        if ($link) {
            echo json_encode($link, JSON_PRETTY_PRINT);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Shortlink not found']);
        }
        exit;
    }

    // route  /shortlinks with pagination
    if (strpos($path, '/shortlinks') !== false) {
        $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
        $perPage = isset($_GET['perPage']) ? max(1, (int)$_GET['perPage']) : 10;
        // simulate loading
        // sleep(1);
        $result = $controller->list($page, $perPage);
        echo json_encode($result, JSON_PRETTY_PRINT);
        exit;
    }

    http_response_code(404);
    echo json_encode(['error' => 'Invalid endpoint']);

} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
