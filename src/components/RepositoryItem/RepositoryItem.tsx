interface RepositoryItemProps {
    repository: {
        created_at: string;
        description: string;
        html_url: string;
        name: string;
    }
};

export const RepositoryItem = ({
    repository
}: RepositoryItemProps) => {
    const calculateDate = (createdAt: string) => {
        const createdAtDate = new Date(createdAt);
        const now = new Date();

        let seconds = (now.getTime() - createdAtDate.getTime()) / 1000;

        const years = Math.floor(seconds / (3.154*(10**7)));
        seconds -= years * (3.154*(10**7));

        const days = Math.floor(seconds / 86400);
        seconds -= days * 86400;

        return `
            ${years === 0 ? "" : (
                years === 1 ? years + " year and" : years + " years and"
            )}
            ${days === 0 ? "" : (
                days === 1 ? days + " day ago" : days + " days ago"
            )}
        `;
    }

    return (
        <li className="repository-item-container">
            <a
                className="repository-item"
                href={repository.html_url ?? "/"}
                target="_blank"
            >
                <div
                    className="repository-item-icon"
                    role="img"
                ></div>

                <div className="repository-item-main-content">
                    <strong>{repository.name ?? "Repository Name"}</strong>
                    <p>{repository.description ?? "Repository Description"}</p>
                </div>

                <div className="repository-item-date-container">
                    <p className="date">
                        <span></span>
                        {calculateDate(repository.created_at)}
                    </p>
                </div>
            </a>
        </li>
    );
}