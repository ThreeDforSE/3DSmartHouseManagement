using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;    

namespace winform
{
    public partial class Main : Form
    {
        string connStr = "server=.;   database=product;  uid=sa; pwd=123456";
        //声明一个数据集
        DataSet ds = new DataSet();
       
        public Main()
        {
            InitializeComponent();
            this.skinEngine1 = new Sunisoft.IrisSkin.SkinEngine(((System.ComponentModel.Component)(this)));
            this.skinEngine1.SkinFile = Application.StartupPath + "//CalmnessColor2.ssk";
            Sunisoft.IrisSkin.SkinEngine se = null;
            se = new Sunisoft.IrisSkin.SkinEngine();
            se.SkinAllForm = true;
        }

        private void btnView_Click(object sender, EventArgs e)
        {
            string sql = "select ProductID,ProductName,ProductModel,ProductPower,Time from List";
            SqlConnection conn = new SqlConnection(connStr);
            SqlCommand cmd = new SqlCommand(sql, conn);
            DataTable dt = new DataTable();
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            dgvManager.DataSource = dt;
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            //定义一个初始值n=0, 用于判断后期是否成功插入数据
            int n = 0;
            string sql = "insert into List(ProductName,ProductModel,ProductPower,Time) values (@ProductName,@ProductModel,@ProductPower,@Time)";
            //判断插入的数据是否为空,如果为空,则提示重新插入!
            if (txtName.Text.Trim() == "" || txtModel.Text.Trim() == "" || txtPower.Text.Trim() == "" || txtDate.Text.Trim() == "")
            {
                MessageBox.Show("插入数据不能为空,请按要求插入数据!");
                return;
            }
            //向数据库插入参数
            SqlParameter[] param ={
                                       new SqlParameter("@ProductName",txtName.Text),
                                       new SqlParameter("@ProductModel",txtModel.TabIndex),
                                       new SqlParameter("@ProductPower",txtPower.Text),
                                       new SqlParameter("@Time",Convert.ToDateTime(txtDate.Text))
 
                                   };
            SqlConnection conn = new SqlConnection(connStr);
            SqlCommand cmd = new SqlCommand(sql, conn);
            conn.Open();
            cmd.Parameters.AddRange(param);
            n = cmd.ExecuteNonQuery();
            if (n == 0)
            {
                MessageBox.Show("添加失败!");
                return;
            }
            else if (n > 0)
            {
                MessageBox.Show("添加成功!");
            }
            conn.Close();
            //调用refresh方法,在添加完成数据后 自动刷新 显示新数据
            Refresh(true);
        }
        public void Refresh(bool isAdded = false)
        {
            string sql = "select ProductId,ProductName,ProductModel,ProductPower,Time from List";
            SqlConnection conn = new SqlConnection(connStr);
            SqlCommand cmd = new SqlCommand(sql, conn);
            DataTable dt = new DataTable();
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            dgvManager.DataSource = dt;

            if (isAdded)
            {
                if (dt.Rows.Count > 0) dgvManager.Rows[0].Selected = false;
                dgvManager.Rows[dt.Rows.Count - 1].Selected = true;
            }
        }

        private void Main_Load(object sender, EventArgs e)
        {
            string sql = "select ProductId,ProductName,ProductModel,ProductPower,Time from List";
            SqlConnection conn = new SqlConnection(connStr);
            SqlCommand cmd = new SqlCommand(sql, conn);
            DataTable dt = new DataTable();
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            sda.Fill(dt);
            dgvManager.DataSource = dt;
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            string sql = "delete from List where 1=1";
            //如果datagridview的当前行被选中
            if (dgvManager.CurrentRow.Selected)
            {
                //将sql语句 delete from List where 1=1 + and Id = + 当前选中行的第0个单元格的号码(即Id号)
                sql = sql + "and ProductId=" + Convert.ToInt32(dgvManager.CurrentRow.Cells[0].Value.ToString());
            }
            int n = 0;
            SqlConnection conn = new SqlConnection(connStr);
            SqlCommand cmd = new SqlCommand(sql, conn);
            conn.Open();
            n = cmd.ExecuteNonQuery();
            if (n == 0)
            {
                MessageBox.Show("不存在的ID!");
                return;

            }
            else if (n > 0)
            {
                MessageBox.Show("删除成功!");
            }
            conn.Close();
            //删除完后 刷新一下当前数据
            Refresh();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            //在对数据进行修改之前 对文本框的内容做一下检查, 如果为空 则提示重新输入
            if (txtName.Text.Trim() == "" || txtModel.Text.Trim() == "" || txtPower.Text.Trim() == "" || txtDate.Text.Trim() == "")
            {
                MessageBox.Show("文本框的输入不能为空!");
                return;
            }
            //使用SQL update 更新语句
            //获取文本框中输入的内容, 通过Id进行更新(Id为当前鼠标点击行的Id)
            string sqlUpdate = "update List set ProductName ='" + txtName.Text + "',ProductModel ='"
             + txtModel.Text + "',ProductPower ='"+ txtPower.Text + "',Time='" + txtDate.Text +
            "'where ProductId='" + dgvManager.CurrentRow.Cells[0].Value.ToString() + "'";
            SqlConnection conn = new SqlConnection(connStr);
            SqlCommand cmdUpdate = new SqlCommand(sqlUpdate, conn);
            conn.Open();
            int n = cmdUpdate.ExecuteNonQuery();
            if (n == 0)
            {
                //提示更新失败
                MessageBox.Show("更新失败!");
                return;// 并且返回
            }
            else if (n > 0)
            {
                //否则更新成功
                MessageBox.Show("恭喜你!更新成功!");
            }
            //执行完数据更新操作后 需要关闭数据库 节省资源
            conn.Close();
            //更新完以后  调用刷新方法,将更新后的数据 显示在datagridview上面
            Refresh();
        }

        private void dgvManager_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            //获取字段名为Movie_Name的单元格内容
            txtName.Text = dgvManager.Rows[e.RowIndex].Cells["ProductName"].Value.ToString();
            //同理 获取当前点击行里的 name属性为Movie_Director的单元格 获取并将其传至txtDirector 文本框
            txtModel.Text = dgvManager.Rows[e.RowIndex].Cells["ProductModel"].Value.ToString();
            //new一个时间对象 目的是将电影发行时间的小时,分和秒给去掉 保留到最小单位为日
            txtPower.Text = dgvManager.Rows[e.RowIndex].Cells["ProductPower"].Value.ToString();
            DateTime datetoDay = new DateTime().Date;
            //将当前行的日期单元格的值 赋给 时间对象datetoDay
            datetoDay = Convert.ToDateTime(dgvManager.Rows[e.RowIndex].Cells["Time"].Value);
            //通过ToShortDateString()方法 将日期后的00:00:00 给剔除掉 并赋给 txtDate文本框
            txtDate.Text = datetoDay.ToShortDateString();
        }
        
    }
}
