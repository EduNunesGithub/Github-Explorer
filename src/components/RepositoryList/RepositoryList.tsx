import {
    useEffect,
    useState
} from "react";

import { RepositoryItem } from "../RepositoryItem/RepositoryItem";

interface Repository {
    created_at: string;
    description: string;
    name: string;
    html_url: string;
};

export const RepositoryList = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);

    useEffect(() => {
        fetch("https://api.github.com/users/edununesgithub/repos")
            .then(response => response.json())
            .then(data => setRepositories(data));
    }, []);

    return (
        <section className="page-container">
            <header className="page-header">
                <h1>
                    Github
                    <span> Repositories</span>
                </h1>

                <div></div>
            </header>

            <ul className="repository-list">
                {repositories.map((item, index) => {
                    return (
                        <RepositoryItem key={item.name + index} repository={item} />
                    );
                })}
            </ul>
        </section>
    );
}
