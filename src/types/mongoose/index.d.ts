import * as mongoose from "mongoose";
declare module "mongoose" {

	interface Schema {
		post<T extends Document>(method: |'find' | string, fn: (
			doc: Array<T>, next: (err?: NativeError) => void
		) => void): this;
	}
}
