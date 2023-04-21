const postsList = document.querySelector(".posts-list");
const postTemplate = document.getElementById(
	"single-post"
) as HTMLTemplateElement;
const errorContainer = document.querySelector(".error") as HTMLElement;

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

class AppError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AppError";
		this.message = message || "Oops, something went wrong";
		this.showError(this.message);
	}

	private showError = (mes: string) => {
		errorContainer!.style.display = "block";
		errorContainer!.innerHTML = mes;
		setTimeout(this.removeError, 3000);
	};

	private removeError = () => {
		errorContainer.style.display = "none";
		errorContainer.innerHTML = "";
	};
}

async function request<TResponse>(
	url: string,
	config: RequestInit = {}
): Promise<TResponse[]> {
	const response = await fetch(url, config);
	if (!response.ok) {
		throw new AppError("Api request failed");
	}
	return await response.json();
}

const api = {
	get: <TResponse>(url: string) => request<TResponse>(url),
};

(async () => {
	try {
		const posts = await api.get<Post>(
			"https://jsonplaceholder.typicode.com/posts"
		);

		posts?.forEach((post) => {
			const postEl = document.importNode(postTemplate.content, true);
			postEl.querySelector("h2")!.textContent = post.title.toUpperCase();
			postEl.querySelector("p")!.textContent = post.body;
			postEl.querySelector("li")!.id = post.id.toString();
			postsList?.append(postEl);
		});
	} catch (error) {
		throw new AppError((error as AppError).message);
	}
})();
