export class NotFoundException extends Error {
	constructor(id: string, ...params : any) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params)
	
		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
		  Error.captureStackTrace(this, NotFoundException)
		}
	
		this.name = 'NotFoundException'
		this.message = `Resource with ID ${id} not found`
	  }
}
