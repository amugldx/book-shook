export interface Link {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	url: string;
	folderId: string | null;
}
