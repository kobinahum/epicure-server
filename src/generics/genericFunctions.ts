export function cleanObject(doc: any) {
	var obj = doc
	delete obj.__v
	delete obj.createdAt
	delete obj.updatedAt
	return obj
}
