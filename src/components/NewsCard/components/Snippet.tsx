import { Flex, Typography } from 'antd';
import { FC, useContext } from 'react';
import { NewsCtx } from '../NewsCard';
import { upperFirstLetter } from '@utils';
import { IData_SnippetNews } from '../types';
import GlobeIcon from '@assets/globe.svg?react';
import BookIcon from '@assets/book.svg?react';
import FrFlag from '@assets/fr.png';
import AuthorIcon from '@assets/author.svg?react'; 
import styles from '../styles/NewsCard.module.scss';

export const Snippet: FC<{data?: IData_SnippetNews}> = ({ data }) => {
    let [DOM, CNTR, CNTR_CODE] = ['', '', ''];
    let AU: string[] = [];
    if(!data) {
        const newsCtx = useContext(NewsCtx);
        if(!newsCtx) {
            return <></>;
        }
        ({DOM, CNTR, CNTR_CODE, AU} = newsCtx);
        CNTR_CODE = upperFirstLetter(CNTR_CODE);
    } else {
        ({DOM, CNTR, AU} = data);
    }

    DOM = upperFirstLetter(DOM);
    AU = AU.map((author, idx) => {
        if(idx < 2) {
            if(idx === AU.length - 1) {
                return author;
            }
            return author + ', ';
        } else if (idx === 2) {
            return 'et al.';
        } else {
            return '';
        }
    }).filter(author => author !== '');

    return (
        <Flex gap='20px'>
            <Flex gap='5px'>
                <GlobeIcon className={styles['snippet__icon']}/>
                <Typography.Link className={styles['snippet__link']} underline={true} href={`https://${DOM}`}>{DOM}</Typography.Link>
            </Flex>
            <Flex gap='5px'>
                <img className={styles['snippet__icon']} src={FrFlag}/>
                <Typography.Text className={styles['text']}>{CNTR}</Typography.Text>
            </Flex>
            {!data && (<Flex gap='5px'>
                <BookIcon className={styles['snippet__icon']}/>
                <Typography.Text className={styles['text']}>{CNTR_CODE}</Typography.Text>
            </Flex>)}
            <Flex gap='5px'>
                <AuthorIcon className={styles['snippet__icon']}/>
                {AU.length ? AU.map((author, idx) => (
                    <Typography.Text className={styles['text']} key={idx}>{author}</Typography.Text>
                )) : <Typography.Text className={styles['text']}>No authors</Typography.Text>}
            </Flex>
        </Flex>
    )
}