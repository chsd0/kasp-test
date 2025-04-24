import { Button, Card, Typography } from 'antd';
import { IData_SnippetNews, IData_SnippetDuplicates } from './types';
import { createContext, FC } from 'react';
import { Header, Snippet, Content, Duplicates, Tags } from './components';
import styles from './styles/NewsCard.module.scss';

export const NewsCtx = createContext<IData_SnippetNews | null>(null);
export const DuplicatesCtx = createContext<IData_SnippetDuplicates | null>(null);

const NewsBlock: FC<{ newsData: IData_SnippetNews, duplicatesData: IData_SnippetDuplicates }> = ({ newsData, duplicatesData }) => {
    return (
        <NewsCtx.Provider value={newsData}>
            <Card className={styles['news-card']}>
                <Header />
                <Typography.Paragraph className={styles['news-card__title']}>{newsData.TI}</Typography.Paragraph>
                <Snippet />
                <Content />
                <Tags />
                <Button className={styles['source-button']} onClick={() => window.open(newsData.URL)}>Original Source</Button>
                <DuplicatesCtx.Provider value={duplicatesData}>
                   <Duplicates />
                </DuplicatesCtx.Provider>
            </Card>
        </NewsCtx.Provider>
    )
};

export default NewsBlock;
