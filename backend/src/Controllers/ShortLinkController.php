<?php

namespace Api\Controllers;

use Api\Repositories\ShortLinkRepository;

class ShortLinkController
{
    private ShortLinkRepository $repo;

    public function __construct(ShortLinkRepository $repo)
    {
        $this->repo = $repo;
    }

    public function list(int $page = 1, int $perPage = 10): array
    {
        $all = $this->repo->getAll();
        $total = count($all);
        $offset = ($page - 1) * $perPage;
        $paged = array_slice($all, $offset, $perPage);

        return [
            'data' => $paged,
            'total' => $total
        ];
    }

    public function detail(string $id): ?array
    {
        return $this->repo->findById($id);
    }
}