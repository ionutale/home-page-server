<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6">Running Docker Containers</h1>

	{#if data.error}
		<div role="alert" class="alert alert-error mb-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{data.error}</span>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.containers as container (container.id)}
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">
						{container.names[0].replace(/^\//, '')}
					</h2>
					<p class="text-sm text-gray-500">{container.image}</p>
					<div class="badge badge-success gap-2">
						{container.status}
					</div>
					
					<div class="mt-4">
						<h3 class="font-semibold">Ports:</h3>
						<ul class="list-disc list-inside text-sm">
							{#each container.ports as port, i (i)}
								<li>
									{port.PrivatePort} (Container)
									{#if port.PublicPort}
										→ {port.PublicPort} (Host)
									{/if}
									[{port.Type}]
								</li>
							{/each}
						</ul>
					</div>

					<div class="card-actions justify-end mt-4">
						{#each container.ports as port, i (i)}
							{#if port.PublicPort}
								<a
									href={`http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:${port.PublicPort}`}
									target="_blank"
									class="btn btn-primary btn-sm"
								>
									Open :{port.PublicPort}
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
    {#if data.containers.length === 0 && !data.error}
        <div class="text-center text-gray-500 mt-10">
            No running containers found.
        </div>
    {/if}
</div>
