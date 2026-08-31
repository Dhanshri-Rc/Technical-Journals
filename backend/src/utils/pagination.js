const MAX_LIMIT = 100;

function getPagination(query) {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(limit) || limit < 1) limit = 9;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

function buildMeta(page, limit, totalItems) {
  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

module.exports = { getPagination, buildMeta, MAX_LIMIT };
