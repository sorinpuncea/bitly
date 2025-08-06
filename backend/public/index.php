<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$shortlinks = json_decode(file_get_contents(__DIR__ . '/../data/shortlinks.json'), true);

$path = $_SERVER['REQUEST_URI'];

// match /shortlinks/{id}
if (preg_match('#/shortlinks/([\w\d]+)#', $path, $matches)) {
    $id = $matches[1];
    $found = null;
    foreach ($shortlinks as $sl) {
        if ($sl['id'] === $id) {
            $found = $sl;
            break;
        }
    }
    if ($found) {
        echo json_encode($found);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
    exit;
}

// match /shortlinks
if (strpos($path, '/shortlinks') !== false) {
    $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
    $perPage = isset($_GET['perPage']) ? max(1, (int)$_GET['perPage']) : 10;
    $offset = ($page - 1) * $perPage;
    $paged = array_slice($shortlinks, $offset, $perPage);

    echo json_encode([
        'data' => $paged,
        'total' => count($shortlinks)
    ]);
    exit;
}


// fallback to 404 page

http_response_code(404);
echo json_encode(['error' => 'Invalid endpoint']);