import styles from "./Layout.module.css";

interface MainProps {
	children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
	return <main className={styles.main}>{children}</main>;
};

interface MainLeftProps {
	children: React.ReactNode;
}

export const MainLeft = ({ children }: MainLeftProps) => {
	return <div className={styles.mainLeft}>{children}</div>;
};

interface MainRightProps {
	children: React.ReactNode;
}

export const MainRight = ({ children }: MainRightProps) => {
	return <div className={styles.mainRight}>{children}</div>;
};

