import styles from "./DashboardSkeletonLoader.module.scss";

export default function DashboardSkeletonLoader() {
  const fakeArray = new Array(10).fill(0);
  return (
    <>
      {fakeArray.map((_, idx) => {
        return (
          <div className={styles.main_loader} key={idx}>
            <header className="flex gap-3">
              <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
              <div className="w-40 h-5 bg-gray-400"></div>
            </header>
            <main className="flex h-200 w-240 bg-gray-400 rounded-lg"></main>
            <footer className="flex gap-3 flex-col mt-2">
              <div className="w-36 h-5 bg-gray-400"></div>
              <div className="w-60 h-5 bg-gray-400"></div>
            </footer>
          </div>
        );
      })}
    </>
  );
}
