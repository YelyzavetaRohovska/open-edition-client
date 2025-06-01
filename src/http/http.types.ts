type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export interface HttpOpt {
	endpoint: string;
	method: HttpMethod;
	token: string;
};

export type SortOrder = 'ASC' | 'DESC';

export interface Pagination<Fields extends string>{
	skip?: number,
	take?: number,
	order?: Partial<Record<Fields, SortOrder>>;
}
