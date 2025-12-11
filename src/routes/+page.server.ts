import Docker from 'dockerode';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const docker = new Docker();
	try {
		const containers = await docker.listContainers();
		return {
			containers: containers.map((container) => ({
				id: container.Id,
				names: container.Names,
				image: container.Image,
				state: container.State,
				status: container.Status,
				ports: container.Ports
			}))
		};
	} catch (error) {
		console.error('Error fetching containers:', error);
		return {
			containers: [],
			error: 'Failed to fetch containers. Make sure Docker is running and the app has permissions.'
		};
	}
};
