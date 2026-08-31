function ok(res, data, message = "Success", status = 200) {
  return res.status(status).json({ success: true, message, data });
}

function created(res, data, message = "Created successfully") {
  return ok(res, data, message, 201);
}

function list(res, data, pagination, message = "Success") {
  return res.status(200).json({ success: true, message, data, pagination });
}

function fail(res, message = "Something went wrong", status = 400, errors = []) {
  return res.status(status).json({ success: false, message, errors });
}

module.exports = { ok, created, list, fail };
