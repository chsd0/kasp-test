import { Flex, Typography, Card, Select, Button } from 'antd';
import { useContext, useState } from 'react';
import { DuplicatesCtx } from '../NewsCard';
import { Header, Snippet } from './';
import { DownOutlined } from '@ant-design/icons';
import styles from '../styles/NewsCard.module.scss';

export const Duplicates = () => {
    const duplicatesCtx = useContext(DuplicatesCtx);
    if(!duplicatesCtx) {
        return;
    }
    const { count, items } = duplicatesCtx;

    const [duplicatesVisibility, setVisibility] = useState<boolean>(false);
    
    return (
        <>
        <Flex className={styles['duplicates']}>
            <Typography.Text className={styles['text']}>
                Duplicates: 
                <Typography.Text className={styles['text-highlight']}>{count}</Typography.Text>
            </Typography.Text>
            <Select className={styles['duplicates__sort']}
                defaultValue="By Relevance"
                variant='borderless'
                options={[
                    { value: 'jack1', label: 'By Relevance' },
                    { value: 'jack', label: 'Not By Relevance' },
                ]}
                dropdownStyle={{
                    width: 'auto'
                }}
            />
        </Flex>
        <Flex className={styles['duplicates__cards'] + (duplicatesVisibility ? ' ' + styles['scroll'] : '')}>
        {items.map((item, idx) => {
            if(idx === 1 || duplicatesVisibility) {
                return (
                    <Card className={styles['duplicates__card'] + (duplicatesVisibility ? ' ' + styles['scroll'] : '')} key={idx}>
                        <Header data={item} />
                        <Typography.Paragraph className={styles['news-card__title']}>{item.TI}</Typography.Paragraph>
                        <Snippet data={item} />
                    </Card>
                )
            }
        })}
        </Flex>
        <Button className={styles['duplicates__button']} 
                onClick={() => setVisibility(!duplicatesVisibility)}>
            <DownOutlined className={styles['duplicates__button-icon'] + (duplicatesVisibility ? ' ' + styles['active'] : '')} /> 
            View Duplicates
        </Button>
        </> 
    )
};