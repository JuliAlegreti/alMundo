import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	root(): string {
		return 'Hello Api Rest of AlMundo!';
	}
}
